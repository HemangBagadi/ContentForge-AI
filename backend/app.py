"""
Main FastAPI Application
"""

from fastapi import FastAPI

from routes.content_routes import router as content_router
from routes.user_routes import router as user_router
from routes.auth_routes import router as auth_router

app = FastAPI()

# Register routes
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(content_router)


@app.get("/")
def home():
    """
    Health check endpoint.
    """

    return {
        "message": "ContentForge AI Backend Running"
    }