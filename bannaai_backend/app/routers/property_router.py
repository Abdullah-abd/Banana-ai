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
