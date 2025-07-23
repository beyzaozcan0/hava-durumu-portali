from flask import Flask, render_template, request
from services.weather_service import WeatherService

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    weather_info = None
    if request.method == "POST":
        city = request.form.get("city")
        weather_service = WeatherService()
        weather_data = weather_service.fetch_weather(city)
        if weather_data:
            weather_info = weather_service.parse_weather(weather_data)
        else:
            weather_info = "Could not retrieve weather data."
    return render_template("index.html", weather_info=weather_info)

if __name__ == "__main__":
    app.run(debug=True)