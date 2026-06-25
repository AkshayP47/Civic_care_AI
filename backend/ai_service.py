from google import genai
import os
import json
import logging
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

# Instantiate once at module level — reused across all requests
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_issue(title: str, description: str) -> dict:
    """
    Analyze an issue using Gemini AI and return structured data.
    """
    result_text = ""
    
    prompt = f"""
You are an AI assistant helping to analyze community sustainability issues for prioritization.

Analyze the following issue and provide a structured response in JSON format.

Issue Title: {title}
Issue Description: {description}

Provide your analysis in the following JSON format (respond ONLY with valid JSON, no additional text):

{{
  "category": "one of: Waste Management, Water Management, Public Infrastructure, Sanitation, Pollution, Other",
  "priority": "one of: Low, Medium, High, Critical",
  "reason": "brief explanation of why this priority was assigned (2-3 sentences)",
  "suggested_action": "specific actionable recommendation (2-3 sentences)"
}}

Consider factors like:
- Public health impact
- Environmental impact
- Urgency
- Affected population
- Alignment with SDG 11 (Sustainable Cities and Communities)
"""
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        result_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if result_text.startswith("```json"):
            result_text = result_text[7:]
        if result_text.startswith("```"):
            result_text = result_text[3:]
        if result_text.endswith("```"):
            result_text = result_text[:-3]
        
        result_text = result_text.strip()
        
        # Parse JSON response
        analysis = json.loads(result_text)
        
        return {
            "category": analysis.get("category", "Other"),
            "priority": analysis.get("priority", "Medium"),
            "reason": analysis.get("reason", "Analysis completed"),
            "suggested_action": analysis.get("suggested_action", "Further investigation needed")
        }
    
    except json.JSONDecodeError as e:
        logger.error(f"JSON parsing error: {e}")
        logger.debug(f"Response text: {result_text}")
        # Fallback response
        return {
            "category": "Other",
            "priority": "Medium",
            "reason": "Unable to parse AI response. Manual review recommended.",
            "suggested_action": "Please review this issue manually for proper categorization."
        }
    
    except Exception as e:
        logger.error(f"Error analyzing issue: {e}")
        # Fallback response
        return {
            "category": "Other",
            "priority": "Medium",
            "reason": "AI analysis encountered an error. Manual review recommended.",
            "suggested_action": "Please review this issue manually for proper categorization."
        }

# Made with Bob
