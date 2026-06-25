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


def generate_content(
    topic: str,
    content_type: str
) -> str:
    """
    Generate AI content based on content type.
    """

    prompts = {

        "linkedin": f"""
        Write a professional LinkedIn post about:

        {topic}

        Requirements:
        - Professional tone
        - Engaging hook
        - Clear structure
        - Call to action
        - Relevant hashtags
        """,

        "twitter": f"""
        Write a Twitter/X post about:

        {topic}

        Requirements:
        - Maximum 280 characters
        - Catchy
        - Include emojis
        - Include hashtags
        """,

        "instagram": f"""
        Write an Instagram caption about:

        {topic}

        Requirements:
        - Friendly tone
        - Storytelling style
        - Include emojis
        - Call to action
        - Relevant hashtags
        """,

        "blog": f"""
        Write a blog outline about:

        {topic}

        Requirements:
        - Catchy title
        - Introduction
        - Main headings
        - Bullet points
        - Conclusion
        """

    }

    prompt = prompts.get(
        content_type.lower(),
        prompts["linkedin"]
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return response.text


def rewrite_content(
    content: str,
    tone: str
) -> str:
    """
    Rewrite AI generated content
    in a different tone.
    """

    prompt = f"""
    Rewrite the following content.

    Tone:
    {tone}

    Content:

    {content}

    Requirements:

    - Keep the original meaning.
    - Improve readability.
    - Use the requested tone.
    - Return only the rewritten content.
    """

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return response.text