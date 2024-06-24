import os
import requests
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = "https://api.gemini.example.com/v1/chat"  # Replace with the actual Gemini API URL

def get_gemini_response(conversation_history):
    try:
        response = requests.post(
            GEMINI_API_URL,
            headers={
                "Authorization": f"Bearer {GEMINI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gemini-model",
                "messages": conversation_history,
                "max_tokens": 2000,
                "temperature": 0.5
            }
        )
        response.raise_for_status()
        data = response.json()
        return data['choices'][0]['message']['content']
    except Exception as e:
        print(f"Error in get_gemini_response: {e}")
        return None
