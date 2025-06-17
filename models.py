from app import db
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

class Building(db.Model):
    __tablename__ = 'buildings'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=True)  # buildings often don't have names
    category = Column(String, nullable=True)  # e.g., 'residential', 'commercial'
    geom = Column(Geometry(geometry_type='GEOMETRY', srid=4326), nullable=False)

    def __init__(self, name=None, category=None, geom=None):
        self.name = name
        self.category = category
        self.geom = geom

    def __repr__(self):
        return f"<Building(id={self.id}, name='{self.name}', category='{self.category}')>"
