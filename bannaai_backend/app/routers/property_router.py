from fastapi import APIRouter, Depends, Path, HTTPException
from sqlalchemy.orm import Session

# Import your database session dependency
from app.database import get_db

# Import models and schemas
from app.models.property import Property
from app.schemas.property import (
    PropertyCreate,
    PropertyRead,
    PropertyUpdate
)

# Import CRUD functions
from app.crud import create_property, get_properties_sorted

# Initialize the router
router = APIRouter(prefix="/properties", tags=["properties"])


# ---------- CREATE ----------
@router.post("/", response_model=PropertyRead)
def add_property(property: PropertyCreate, db: Session = Depends(get_db)):
    """Create a new property record"""
    return create_property(db, property)


# ---------- READ ----------
@router.get("/", response_model=list[PropertyRead])
def read_properties(db: Session = Depends(get_db)):
    """Fetch all properties sorted (custom logic in CRUD)"""
    return get_properties_sorted(db)


# ---------- UPDATE ----------
@router.put("/{property_id}", response_model=PropertyRead)
def update_property(
    property_data: PropertyUpdate,
    property_id: int = Path(..., description="ID of the property to update"),
    db: Session = Depends(get_db)
):
    """Update an existing property"""
    property_obj = db.query(Property).filter(Property.id == property_id).first()
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    
    for key, value in property_data.dict(exclude_unset=True).items():
        setattr(property_obj, key, value)
    
    db.commit()
    db.refresh(property_obj)
    return property_obj


# ---------- DELETE ----------
@router.delete("/{property_id}")
def delete_property(
    property_id: int = Path(..., description="ID of the property to delete"),
    db: Session = Depends(get_db)
):
    """Delete a property record"""
    property_obj = db.query(Property).filter(Property.id == property_id).first()
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    
    db.delete(property_obj)
    db.commit()
    return {"detail": f"Property {property_id} deleted successfully"}
