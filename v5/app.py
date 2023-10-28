from flask import Flask, request, jsonify, render_template
# from flask_cors import CORS  # If you want to enable cross-origin requests
from datetime import datetime
import json
import os

app = Flask(__name__)
# CORS(app)  # Enable cross-origin requests (you may want to restrict this in production)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


# Define the directory path for the location data
loc_data_dir = "location_data"  # Make sure the folder exists in your app directory

# Function to load location data from JSON files in the loc_data directory
def load_location_data():
    location_data = []
    filename = "data.json"
    file_path = os.path.join(loc_data_dir, filename)
    if filename.endswith(".json") and os.path.exists(file_path):
            with open(os.path.join(loc_data_dir, filename), "r") as file:
                data = json.load(file)
                location_data.extend(data)
    return location_data

# Sample location data
location_data = load_location_data()


# # Sample data store for location history (replace with a database)
# location_data = []

# # API endpoint to add a location
# @app.route('/add_location', methods=['POST'])
# def add_location():
#     data = request.json
#     if 'user_id' in data and 'latitude' in data and 'longitude' in data:
#         location = {
#             'user_id': data['user_id'],
#             'latitude': data['latitude'],
#             'longitude': data['longitude'],
#             'timestamp': datetime.now().isoformat(),
#         }
#         location_data.append(location)
#         return jsonify({'message': 'Location added successfully'}), 201
#     else:
#         return jsonify({'error': 'Invalid data format'}), 400


# API endpoint to retrieve location history for a user
# with user_id as a path parameter
# @app.route('/get_location_history/<user_id>', methods=['GET'])
# def get_location_history(user_id):
#     history = [loc for loc in location_data if loc['user_id'] == user_id]
#     return jsonify({'location_history': history})

# without user_id (temp)
@app.route('/get_location_history', methods=['GET'])
def get_location_history():
    return jsonify({'location_history': location_data})



if __name__ == '__main__':
    app.run(debug=True, port=1022)  # In a production environment, set debug=False
    # !!! Caution !!!
    # port number is changed in order to avoid conflict with other services (default: 5000)
