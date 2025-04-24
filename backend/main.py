from flask import request, jsonify
from config import db, app
#from models import Model

@app.route("/route1", methods=["GET"])
def route1():
    return "Hello from route1!"

#checks if we are running directly. Protects against running the file if you are importing the file
if __name__ == "__main__":
    # First, create the database if it doesn't exist
    with app.app_context():
        db.create_all()

    app.run(debug=True)