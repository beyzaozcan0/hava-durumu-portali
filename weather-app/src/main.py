from flask import Flask, request, jsonify
from services.weather_service import WeatherService
from flask_cors import CORS  # React için şart!

app = Flask(__name__)
CORS(app)  # React frontend'den gelen isteklere izin verir

@app.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parametresi eksik"}), 400

    weather_service = WeatherService()
    weather_data = weather_service.fetch_weather(city)

    if weather_data:
        parsed = weather_service.parse_weather(weather_data)
        return jsonify(parsed)
    else:
        return jsonify({"error": "Veri alınamadı"}), 500

if __name__ == "__main__":
    app.run(debug=True)
