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
    """
    Returns all properties with computed price_per_sqft.
    """
    properties = db.query(Property).all()
    result = []
    for p in properties:
        price_per_sqft = (p.price / p.area_sqft) if p.area_sqft else 0
        result.append({
            "id": p.id,
            "name": p.name,
            "location": p.location,
            "area_sqft": p.area_sqft,
            "price": p.price,
            "image": getattr(p, "image", None),
            "price_per_sqft": price_per_sqft
        })
    return result

def get_properties_sorted(db: Session):
    """
    Returns all properties sorted by price_per_sqft.
    """
    properties_with_ppsqft = get_properties(db)
    return sorted(properties_with_ppsqft, key=lambda x: x["price_per_sqft"])
