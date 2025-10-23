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
    """
    Returns all properties sorted by price per square foot (price / area_sqft).
    If area_sqft is 0 or None, treats it as 0 to avoid division by zero.
    """
    properties = db.query(Property).all()
    return sorted(
        properties,
        key=lambda x: (x.price / x.area_sqft) if x.area_sqft else 0
    )
