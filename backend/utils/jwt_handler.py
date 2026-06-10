"""
JWT Utilities

Responsible for:
- Creating JWT tokens
- Verifying JWT tokens
"""

import os
from datetime import datetime, timedelta

from jose import JWTError, jwt
from dotenv import load_dotenv


# Load environment variables
load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("JWT_ALGORITHM")


def create_access_token(data: dict):
    """
    Create JWT token.
    """

    payload = data.copy()

    expire = datetime.utcnow() + timedelta(hours=1)

    payload.update({"exp": expire})

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

def verify_access_token(token: str):
    """
    Verify JWT token.
    """

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:
        return None