from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.property import PropertyCreate, PropertyRead
from app.crud import create_property

router = APIRouter(prefix="/properties", tags=["properties"])

@router.post("/", response_model=PropertyRead)
def add_property(property: PropertyCreate, db: Session = Depends(get_db)):
    return create_property(db, property)
@router.get("/", response_model=list[PropertyRead])
def read_properties(db: Session = Depends(get_db)):
    return get_properties_sorted(db)
from fastapi import Path, HTTPException

@router.put("/{property_id}", response_model=PropertyRead)
def update_property(
    property_data: PropertyUpdate,
    property_id: int = Path(..., description="ID of the property to update"),
    db: Session = Depends(get_db)
):
    property_obj = db.query(Property).filter(Property.id == property_id).first()
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    
    for key, value in property_data.dict(exclude_unset=True).items():
        setattr(property_obj, key, value)
    
    db.commit()
    db.refresh(property_obj)
    return property_obj
@router.delete("/{property_id}")
def delete_property(
    property_id: int = Path(..., description="ID of the property to delete"),
    db: Session = Depends(get_db)
):
    property_obj = db.query(Property).filter(Property.id == property_id).first()
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    
    db.delete(property_obj)
    db.commit()
    return {"detail": f"Property {property_id} deleted successfully"}
