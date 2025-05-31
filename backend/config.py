from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from geoalchemy2 import Geometry
from flask_cors import CORS

app = Flask(__name__) #initialize flask app
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}}) #Allows frontend to access the backend that is in a different port

SQLALCHEMY_DATABASE_URI = "postgresql://localhost/maplab"
SQLALCHEMY_TRACK_MODIFICATIONS = False

app.config.from_object("config")
db = SQLAlchemy(app)