from pydantic import BaseModel

class PropertyBase(BaseModel):
    name: str
    location: str | None = None
    area_sqft: float
    price: float

class PropertyCreate(PropertyBase):
    pass

class PropertyRead(PropertyBase):
    id: int
    price_per_sqft: float

    class Config:
        orm_mode = True
from pydantic import BaseModel
from typing import Optional

class PropertyUpdate(BaseModel):
    name: Optional[str]
    price: Optional[float]
    location: Optional[str]

    class Config:
        from_attributes = True  # Pydantic v2 replacement for orm_mode
