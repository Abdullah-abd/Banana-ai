import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

class Settings:
    PROJECT_NAME: str = "BannaAI Backend"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/bannaai")
    PORT: int = int(os.getenv("PORT", 8000))

settings = Settings()
