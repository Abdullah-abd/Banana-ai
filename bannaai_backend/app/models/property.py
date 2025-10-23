from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Property(Base):
    __tablename__ = "properties"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=True)
    area_sqft = Column(Float, nullable=False)
    price = Column(Float, nullable=False)

@property
def price_per_sqft(self):
    if not self.area_sqft or self.area_sqft == 0:
        return 0
    return self.price / self.area_sqft
