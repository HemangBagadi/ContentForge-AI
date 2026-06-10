"""
Gemini Client

Handles communication with Gemini AI.
"""

import os

from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Create Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Read model name from .env
MODEL_NAME = os.getenv(
    "GEMINI_MODEL",
    "gemini-2.5-flash"
)


def generate_linkedin_post(topic: str) -> str:
    """
    Generate a professional LinkedIn post.
    """

    prompt = f"""
    Write a professional LinkedIn post about:

    {topic}

    Requirements:
    - Professional tone
    - Engaging hook
    - Clear structure
    - Include call to action
    """

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return response.text
