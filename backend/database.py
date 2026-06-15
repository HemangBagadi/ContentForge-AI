"""
Database Configuration

Responsible for:
- Connecting to MongoDB Atlas
- Exposing collections
"""

import os

from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables
load_dotenv()

# Read MongoDB URI
MONGODB_URI = os.getenv("MONGODB_URI")

# Create MongoDB client
client = MongoClient(MONGODB_URI)

# ContentForge AI Database
db = client["contentforge_ai"]

# Collections
users_collection = db["users"]

content_collection = db["contents"]

content_collection = db["content_history"]