"""
Main FastAPI Application
"""

from fastapi import FastAPI

from routes.auth_routes import router as auth_router

app = FastAPI()

# Register routes
app.include_router(auth_router)


@app.get("/")
def home():
    """
    Health check endpoint.
    """

    return {
        "message": "ContentForge AI Backend Running"
    }