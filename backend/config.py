from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from geoalchemy2 import Geometry
from flask_cors import CORS

app = Flask(__name__) #initialize flask app
CORS(app) #Allows frontend to access the backend that is in a different port

db = SQLAlchemy(app)