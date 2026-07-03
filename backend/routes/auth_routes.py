"""
Authentication Routes

Contains:
- User Signup
- User Login
"""

from fastapi import APIRouter, HTTPException

from datetime import datetime
from models import UserSignup, UserLogin
from utils.password import hash_password, verify_password
from utils.jwt_handler import create_access_token
from database import users_collection
from fastapi import Depends
from database import content_collection
from utils.auth_middleware import get_current_user
# Create router
router = APIRouter()


@router.post("/signup")
def signup(user: UserSignup):
    """
    Create a new user account.
    """

    # Check if email already exists
    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Create user document
    new_user = {
    "name": user.name,
    "email": user.email,
    "password": hash_password(user.password),
    "created_at": datetime.utcnow()
}

    # Insert into MongoDB
    users_collection.insert_one(new_user)

    return {
        "message": "Account created successfully"
    }

@router.post("/login")
def login(user: UserLogin):
    """
    Login existing user.
    """

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    password_valid = verify_password(
        user.password,
        existing_user["password"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token(
        {
            "user_id": str(existing_user["_id"]),
            "email": existing_user["email"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
@router.get("/profile")
def get_profile(
    current_user=Depends(get_current_user)
):
    """
    Get logged-in user's profile.
    """

    user = users_collection.find_one(
        {
            "email": current_user["email"]
        }
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    posts_generated = content_collection.count_documents(
        {
            "user_email": current_user["email"]
        }
    )

    return {
        "name": user["name"],
        "email": user["email"],
        "member_since": user.get("created_at"),
        "posts_generated": posts_generated,
        "ai_model": "Gemini 2.5 Flash"
    }