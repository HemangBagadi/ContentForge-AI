"""
Content Generation Routes
"""

from fastapi import APIRouter, Depends

from datetime import datetime

from database import content_collection
from models import ContentRequest
from utils.auth_middleware import get_current_user
from utils.gemini_client import generate_linkedin_post

router = APIRouter()


@router.post("/generate-linkedin-post")
def generate_post(
    request: ContentRequest,
    current_user=Depends(get_current_user)
):
    """
    Generate LinkedIn content.
    """

    content = generate_linkedin_post(
        request.topic
    )

    content_document = {
        "user_email": current_user["email"],
        "content_type": "linkedin",
        "topic": request.topic,
        "generated_content": content,
        "created_at": datetime.utcnow()
    }

    content_collection.insert_one(
        content_document
    )

    return {
        "content": content
    }