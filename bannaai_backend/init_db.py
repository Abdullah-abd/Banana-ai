from app.database import Base, engine
from app.models.property import Property

Base.metadata.create_all(bind=engine)
