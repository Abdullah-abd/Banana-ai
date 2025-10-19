from sqlalchemy.orm import Session
from app.models.property import Property
from app.schemas.property import PropertyCreate

def create_property(db: Session, property: PropertyCreate):
    db_property = Property(**property.dict())
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

def get_properties(db: Session):
    return db.query(Property).all()

def get_properties_sorted(db: Session):
    return sorted(db.query(Property).all(), key=lambda x: x.price_per_sqft)
