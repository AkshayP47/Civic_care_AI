# UrbanPulse AI

**AI-Powered Community Issue Reporting for Sustainable Cities**

UrbanPulse AI is a web application that demonstrates how Artificial Intelligence can support sustainability by helping citizens report local community issues and automatically prioritizing them using AI analysis.

## 🌍 Project Overview

This project aligns with **UN Sustainable Development Goal 11: Sustainable Cities and Communities**. It empowers citizens to report sustainability-related issues such as:

- Garbage accumulation
- Water leakage
- Open drainage
- Broken street lights
- Potholes
- Pollution hotspots

The application uses **Google Gemini AI** to automatically analyze each reported issue and determine:
- **Category** (Waste Management, Water Management, Public Infrastructure, etc.)
- **Priority Level** (Low, Medium, High, Critical)
- **Reasoning** behind the priority assignment
- **Suggested Actions** for addressing the issue

## 🛠️ Tech Stack

### Frontend
- **React** (with Vite)
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Python 3.8+**
- **FastAPI** for REST API
- **SQLite** for database
- **SQLAlchemy** for ORM
- **Google Gemini AI** for issue analysis

## 📋 Prerequisites

Before running this application, ensure you have:

1. **Node.js** (v16 or higher) and npm installed
2. **Python** (v3.8 or higher) installed
3. **Google Gemini API Key** (Get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
cd urbanpulse-ai
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Create a virtual environment (recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### Install dependencies
```bash
pip install -r requirements.txt
```

#### Configure environment variables
Create a `.env` file in the `backend` directory:

```bash
# Copy the example file
copy .env.example .env  # Windows
# or
cp .env.example .env    # macOS/Linux
```

Edit the `.env` file and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

#### Run the backend server
```bash
uvicorn main:app --reload
```

The backend API will be available at: `http://localhost:8000`

### 3. Frontend Setup

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Run the frontend development server
```bash
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## 📱 Using the Application

1. **Home Page**: View project information and SDG 11 details
2. **Report Issue**: 
   - Fill in the issue title and description
   - Optionally upload an image
   - Click "Analyze Issue" to get AI-powered analysis
   - Review the AI analysis (category, priority, reasoning, suggested action)
   - Click "Submit Issue Report" to save the report
3. **View Reports**: See all submitted issues with their AI analysis

## 🔑 API Endpoints

### Backend API (http://localhost:8000)

- `GET /` - API health check
- `POST /analyze` - Analyze an issue using Gemini AI
  ```json
  {
    "title": "Issue title",
    "description": "Issue description"
  }
  ```
- `POST /issues` - Create a new issue (multipart/form-data)
- `GET /issues` - Get all issues
- `GET /issues/{id}` - Get a specific issue

## 📁 Project Structure

```
urbanpulse-ai/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database models and configuration
│   ├── ai_service.py        # Gemini AI integration
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment variables template
│   └── uploads/             # Uploaded images (created automatically)
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Home page
│   │   │   ├── ReportIssue.jsx    # Report issue form
│   │   │   └── Reports.jsx        # View all reports
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   ├── api.js                 # API service
│   │   └── index.css              # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🤖 Responsible AI

This application uses AI to assist in prioritizing community issues, but it should not replace human decision-making. The AI-generated recommendations are meant to support sustainability efforts and community well-being. Final decisions should always involve human judgment, local context, and community input.

## 🎯 Key Features

- **Simple & Clean UI**: Minimal design focused on usability
- **AI-Powered Analysis**: Automatic categorization and prioritization
- **Image Upload**: Optional photo documentation of issues
- **Real-time Processing**: Instant AI analysis of reported issues
- **Comprehensive Reports**: View all issues with detailed AI insights
- **Sustainability Focus**: Aligned with UN SDG 11

## 🌱 Sustainability Impact

UrbanPulse AI demonstrates how AI can contribute to sustainable urban development by:

1. **Empowering Citizens**: Making it easy to report local issues
2. **Data-Driven Decisions**: Using AI to prioritize urgent problems
3. **Resource Optimization**: Helping communities address critical issues first
4. **Transparency**: Providing clear reasoning for AI recommendations
5. **Community Engagement**: Fostering civic participation in sustainability

## 🔧 Troubleshooting

### Backend Issues

- **Import errors**: Make sure you've activated the virtual environment and installed all dependencies
- **Database errors**: The SQLite database will be created automatically on first run
- **API key errors**: Verify your Gemini API key is correctly set in the `.env` file

### Frontend Issues

- **Port conflicts**: If port 5173 is in use, Vite will automatically use the next available port
- **API connection errors**: Ensure the backend is running on `http://localhost:8000`
- **Build errors**: Try deleting `node_modules` and running `npm install` again

## 📝 License

This project is created for educational and demonstration purposes as part of an AI + Sustainability internship submission.

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify for your own learning purposes.

## 📧 Contact

For questions or feedback about this project, please reach out through the internship submission portal.

---

**Built with ❤️ for Sustainable Cities and Communities**