from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
from geoalchemy2.shape import from_shape
from shapely.geometry import Point, Polygon, MultiPolygon
from requests.exceptions import Timeout, RequestException

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, static_folder='static', template_folder='templates')
    CORS(app)
    app.config.from_object("config")
    db.init_app(app)

    from models import POI, Building

    @app.route("/")
    def index():
        from flask import render_template
        return render_template("index.html")
    
    @app.route("/route1", methods=["GET"])
    def route1():
        return "Hello from route1!"

    #Tells flask to create a new H1TTP endpoint
    @app.route("/get_pois", methods=["POST"])
    def get_pois():
        def input_pois_in_database(poi_result):
            for element in poi_result.get('elements', []):
                if 'tags' in element and 'amenity' in element['tags']:
                    name = element['tags'].get('name', 'Unknown')
                    category = element['tags']['amenity']
                    
                    # Handle coordinates based on element type
                    if element['type'] == 'node':
                        lat = element['lat']
                        lon = element['lon']
                    else:  # for ways and relations
                        continue
                    
                    # Create a Point geometry from the coordinates
                    point = Point(lon, lat)
                    geom = from_shape(point, srid=4326)
                    
                    # Create and add the POI to the database
                    poi = POI(name=name, category=category, geom=geom)
                    db.session.add(poi)
            
            # Commit all changes to the database
            db.session.commit()

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
                [out:json][timeout:5];
                (
                node(around:{radius},{lat},{lon})["amenity"];
                relation(around:{radius},{lat},{lon})["amenity"];
                );
                out center 100;
            """

            response = requests.post("https://overpass-api.de/api/interpreter", data=query, timeout=6)
            response.raise_for_status()  # Raise an exception for bad status codes 

            poi_result = response.json()
            print(poi_result)
            input_pois_in_database(poi_result)
            return jsonify(poi_result)
        
        except Timeout:
            return jsonify({"error": "The Overpass API request timed out."}), 504
        
        except RequestException as e:
            return jsonify({"error": f"E error: {str(e)}"}), 500
    
    @app.route("/get_buildings", methods=["POST"])
    def get_buildings():
        def input_buildings_in_database(building_result):
            for element in building_result.get('elements', []):
                if 'tags' in element and element['type'] == 'way' and 'building' in element['tags']:
                    name = element['tags'].get('name', 'Unknown')
                    category = element['tags'].get('building', 'unknown')  # e.g., residential, yes, etc.

                    # Extract polygon coordinates
                    if 'geometry' in element:
                        coords = [(node['lon'], node['lat']) for node in element['geometry']]
                        
                        if coords[0] != coords[-1]:
                            coords.append(coords[0])  # Ensure it's a closed ring

                        try:
                            polygon = Polygon(coords)
                            if not polygon.is_valid:
                                continue  # skip invalid polygons

                            geom = from_shape(polygon, srid=4326)
                            building = Building(name=name, category=category, geom=geom)
                            db.session.add(building)
                        except Exception as e:
                            print(f"Error creating polygon: {e}")

            db.session.commit()
        
        print('get buildings started')

        # FIX THIS
        try:
            data = request.json
            if not data or not all(key in data for key in ["lat", "lon", "radius", "query_limit"]):
                return jsonify({"error": "Missing required parameters"}), 400

            lat = data["lat"]
            lon = data["lon"]
            radius = data["radius"]
            query_limit = data["query_limit"]
            # this is an Overpass QL query written as a Python multi-line f-string
            query = f"""
            [out:json][timeout:5];
            (
            way(around:{radius},{lat},{lon})["building"];
            );
            out body {query_limit};    
            >;
            out skel qt {query_limit};
            """
            # Be careful with the query. Out geom outputs geometry directly,
            # can also use out center, out body >, out skel qt (for speed) etc.
            #

            response = requests.post("https://overpass-api.de/api/interpreter", data=query, timeout=6)
            response.raise_for_status()  # Raise an exception for bad status codes 

            building_result = response.json()
            print(building_result)
            #input_buildings_in_database(building_result, limit)
            return jsonify(building_result)
        
        except Timeout:
            return jsonify({"error": "The Overpass API request timed out."}), 504
    
        except RequestException as e:
            return jsonify({"error": f"E error: {str(e)}"}), 500
        
    return app
