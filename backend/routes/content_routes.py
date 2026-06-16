"""
Content Generation Routes
"""

from fastapi import APIRouter, Depends
from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from bson import ObjectId
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
@router.get("/content-history")
def get_content_history(
    current_user=Depends(get_current_user)
):
    """
    Get all generated content
    for the logged-in user.
    """

    contents = content_collection.find(
        {
            "user_email": current_user["email"]
        }
    ).sort("created_at", -1)

    result = []

    for content in contents:
        result.append(
            {
                "id": str(content["_id"]),
                "content_type": content["content_type"],
                "topic": content["topic"],
                "generated_content": content["generated_content"],
                "created_at": content["created_at"]
            }
        )

    return result
@router.get("/content/{content_id}")
def get_single_content(
    content_id: str,
    current_user=Depends(get_current_user)
):
    """
    Get a single content item.
    """

    content = content_collection.find_one(
        {
            "_id": ObjectId(content_id),
            "user_email": current_user["email"]
        }
    )

    if not content:
        raise HTTPException(
            status_code=404,
            detail="Content not found"
        )

    return {
        "id": str(content["_id"]),
        "content_type": content["content_type"],
        "topic": content["topic"],
        "generated_content": content["generated_content"],
        "created_at": content["created_at"]
    }
@router.delete("/content/{content_id}")
def delete_content(
    content_id: str,
    current_user=Depends(get_current_user)
):
    """
    Delete a content item.
    """

    result = content_collection.delete_one(
        {
            "_id": ObjectId(content_id),
            "user_email": current_user["email"]
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Content not found"
        )

    return {
        "message": "Content deleted successfully"
    }