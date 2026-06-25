# UrbanPulse AI - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Setup Backend
```bash
# Navigate to backend directory
cd urbanpulse-ai/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env  # Windows
# or
cp .env.example .env    # macOS/Linux

# Edit .env and add your API key:
# GEMINI_API_KEY=your_actual_api_key_here

# Start backend server
uvicorn main:app --reload
```

Backend will run at: http://localhost:8000

### Step 3: Setup Frontend (New Terminal)
```bash
# Navigate to frontend directory
cd urbanpulse-ai/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at: http://localhost:5173

### Step 4: Use the Application
1. Open http://localhost:5173 in your browser
2. Click "Report an Issue"
3. Fill in the form with a sustainability issue
4. Click "Analyze Issue" to get AI analysis
5. Review the AI recommendations
6. Click "Submit Issue Report"
7. View all reports on the "View Reports" page

## 📝 Example Issue to Test

**Title:** Garbage accumulation near school

**Description:** Large pile of garbage has accumulated near the government school on Main Street. The waste has been there for over a week and is causing foul smell. It's attracting insects and stray animals, which poses health risks to the children.

## ✅ Verification Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Gemini API key configured
- [ ] Can submit an issue
- [ ] AI analysis appears
- [ ] Issue saved to database
- [ ] Can view reports

## 🆘 Common Issues

**Backend won't start:**
- Make sure virtual environment is activated
- Check if all dependencies are installed
- Verify .env file exists with valid API key

**Frontend won't start:**
- Delete node_modules and run `npm install` again
- Check if port 5173 is available

**AI analysis fails:**
- Verify Gemini API key is correct
- Check internet connection
- Look at backend terminal for error messages

## 🎯 Project Features

✅ Clean, minimal UI
✅ AI-powered issue analysis
✅ Image upload support
✅ Real-time categorization
✅ Priority assignment
✅ Suggested actions
✅ Complete issue tracking
✅ SDG 11 alignment
✅ Responsible AI messaging

---

**Ready to make your community more sustainable!** 🌱