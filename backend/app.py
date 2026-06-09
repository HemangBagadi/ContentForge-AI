"""
Main FastAPI Application

This file is the entry point of the ContentForge AI backend.
All routes will eventually be connected here.
"""

from fastapi import FastAPI

# Create FastAPI application instance
app = FastAPI()


@app.get("/")
def home():
    """
    Health check endpoint.

    Used to verify that the backend server
    is running correctly.
    """
    return {
        "message": "ContentForge AI Backend Running"
    }