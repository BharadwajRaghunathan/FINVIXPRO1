import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Gemini AI API key
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# JWT Secret Key for authentication
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')