"""
Authentication Routes

Contains:
- User Signup
- User Login
"""

from fastapi import APIRouter, HTTPException

from models import UserSignup, UserLogin
from utils.password import hash_password, verify_password
from utils.jwt_handler import create_access_token
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