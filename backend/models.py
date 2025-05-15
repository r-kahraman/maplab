from config import db
from sqlalchemy import Column, Integer, String
from geoalchemy2 import Geometry

class POI(db.Model):
    __tablename__ = 'pois'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    category = Column(String)
    geom = Column(Geometry(geometry_type='POINT', srid=4326))

    def __init__(self, name, category, geom):
        self.name = name
        self.category = category
        self.geom = geom

    def __repr__(self):
        return f"<POI(id={self.id}, name='{self.name}', category='{self.category}')>"