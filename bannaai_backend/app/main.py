from fastapi import FastAPI, Path, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.core.config import settings
from app.database import get_db
from app.models.property import Property
from app.schemas.property import PropertyUpdate
from app.routers import property_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Backend API for BannaAI Project"
)

# CORS settings
origins = [
    "https://banana-ai-ten.vercel.app",  # your deployed frontend
    "http://localhost:3000",             # local frontend for development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # allow these origins
    allow_credentials=True,
    allow_methods=["*"],         # allow all HTTP methods
    allow_headers=["*"],         # allow all headers
)

@app.get("/")
def read_root():
    return {"message": "BannaAI Backend is running!"}

# Include your property router
app.include_router(property_router.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
