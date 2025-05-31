from flask import request, jsonify
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import db, app
from models import POI
import requests

@app.route("/route1", methods=["GET"])
def route1():
    return "Hello from route1!"

#Tells flask to create a new H1TTP endpoint
@app.route("/get_pois", methods=["POST"])
def get_pois():
    print('get_pois_started')
    try:
        data = request.json
        if not data or not all(key in data for key in ["lat", "lon", "radius"]):
            return jsonify({"error": "Missing required parameters"}), 400

        lat = data["lat"]
        lon = data["lon"]
        radius = data["radius"]
        # this is an Overpass QL query written as a Python multi-line f-string
        query = f"""
            [out:json][timeout:25];
            (
              node(around:{radius},{lat},{lon})["amenity"];
              way(around:{radius},{lat},{lon})["amenity"];
              relation(around:{radius},{lat},{lon})["amenity"];
            );
            out center;
        """

        response = requests.post("https://overpass-api.de/api/interpreter", data=query)
        print('x')
        response.raise_for_status()  # Raise an exception for bad status codes

        poi_result = response.json()
        print(poi_result)
        return jsonify(poi_result)
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"E error: {str(e)}"}), 500

#checks if we are running directly. Protects against running the file if you are importing the file
if __name__ == "__main__":
    # First, create the database if it doesn't exist
    with app.app_context():
        db.create_all()

    app.run(debug=True)
