from fastapi import FastAPI, Path, HTTPException, Depends
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

@app.get("/")
def read_root():
    return {"message": "BannaAI Backend is running!"}

# Include your property router
app.include_router(property_router.router)

# @app.put("/properties/{property_id}", response_model=PropertyUpdate)
# def update_property(
#     property_data: PropertyUpdate,
#     property_id: int = Path(..., description="ID of the property to update"),
#     db: Session = Depends(get_db)
# ):
#     property_obj = db.query(Property).filter(Property.id == property_id).first()
#     if not property_obj:
#         raise HTTPException(status_code=404, detail="Property not found")
    
#     for key, value in property_data.dict(exclude_unset=True).items():
#         setattr(property_obj, key, value)
    
#     db.commit()
#     db.refresh(property_obj)
#     return property_obj

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

