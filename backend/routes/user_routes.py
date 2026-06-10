"""
User Routes

Protected routes for authenticated users.
"""

from fastapi import APIRouter, Depends

from utils.auth_middleware import get_current_user

router = APIRouter()


@router.get("/profile")
def profile(
    current_user=Depends(get_current_user)
):
    """
    Return logged-in user information.
    """

    return {
        "message": "Protected route accessed",
        "user": current_user
    }