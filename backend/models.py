"""
Pydantic Models

This file contains all request and response schemas
used throughout the application.
"""

from pydantic import BaseModel, EmailStr, Field


class UserSignup(BaseModel):
    """
    Model used when a user creates an account.
    """

    name: str = Field(..., min_length=2, max_length=50)

    email: EmailStr

    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    """
    Model used when a user logs in.
    """

    email: EmailStr

    password: str


class ContentRequest(BaseModel):
    """
    Model used for content generation.
    """

    topic: str = Field(
        ...,
        min_length=5,
        max_length=500
    )