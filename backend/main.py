from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import Optional
import os
import shutil
from datetime import datetime

from database import get_db, init_db, Issue
from ai_service import analyze_issue
from pydantic import BaseModel, ConfigDict

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(title="UrbanPulse AI API", lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount static files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Pydantic models
class AnalyzeRequest(BaseModel):
    title: str
    description: str

class AnalyzeResponse(BaseModel):
    category: str
    priority: str
    reason: str
    suggested_action: str

class IssueResponse(BaseModel):
    id: int
    title: str
    description: str
    image_path: Optional[str]
    category: str
    priority: str
    reason: str
    suggested_action: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Routes
@app.get("/")
def read_root():
    return {"message": "UrbanPulse AI API", "status": "running"}

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze_issue_endpoint(request: AnalyzeRequest):
    """
    Analyze an issue using Gemini AI
    """
    try:
        analysis = analyze_issue(request.title, request.description)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing issue: {str(e)}")

@app.post("/issues", response_model=IssueResponse)
async def create_issue(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    priority: str = Form(...),
    reason: str = Form(...),
    suggested_action: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """
    Create a new issue with optional image upload
    """
    image_path = None
    
    # Handle image upload
    if image:
        # Generate unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{timestamp}_{image.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        image_path = f"/uploads/{filename}"
    
    # Create issue in database
    db_issue = Issue(
        title=title,
        description=description,
        image_path=image_path,
        category=category,
        priority=priority,
        reason=reason,
        suggested_action=suggested_action
    )
    
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    
    return db_issue

@app.get("/issues", response_model=list[IssueResponse])
def get_issues(db: Session = Depends(get_db)):
    """
    Get all issues
    """
    issues = db.query(Issue).order_by(Issue.created_at.desc()).all()
    return issues

@app.get("/issues/{issue_id}", response_model=IssueResponse)
def get_issue(issue_id: int, db: Session = Depends(get_db)):
    """
    Get a specific issue by ID
    """
    issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return issue

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

# Made with Bob
