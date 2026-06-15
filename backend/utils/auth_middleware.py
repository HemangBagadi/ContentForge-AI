from fastapi import Header, HTTPException

from utils.jwt_handler import verify_access_token


def get_current_user(
    authorization: str = Header(None)
):
    print("AUTH HEADER =", authorization)

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization token missing"
        )

    try:
        token = authorization.split(" ")[1]

    except IndexError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token format"
        )

    payload = verify_access_token(token)

    print("PAYLOAD =", payload)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    return payload