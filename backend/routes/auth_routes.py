"""
Authentication Routes

Contains:
- User Signup
- User Login
"""

from fastapi import APIRouter, HTTPException

from models import UserSignup
from database import users_collection
from utils.password import hash_password

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
        "password": hash_password(user.password)
    }

    # Insert into MongoDB
    users_collection.insert_one(new_user)

    return {
        "message": "Account created successfully"
    }