"""
Content Generation Routes
"""

from fastapi import APIRouter, Depends

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

    return {
        "content": content
    }