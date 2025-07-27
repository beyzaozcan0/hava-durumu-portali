class WeatherService:
    def fetch_weather(self, city):
        import requests
        api_key = "Kendi_API_Keyini_Gir"
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception("Error fetching weather data")

    def parse_weather(self, data):
        # İngilizce açıklamaların Türkçe karşılıkları
        desc_tr = {
            "clear sky": "Açık",
            "few clouds": "Az bulutlu",
            "scattered clouds": "Dağınık bulutlu",
            "broken clouds": "Parçalı bulutlu",
            "shower rain": "Sağanak yağış",
            "rain": "Yağmur",
            "thunderstorm": "Fırtına",
            "snow": "Kar",
            "mist": "Sis"
        }

        desc_en = data["weather"][0]["description"].lower()
        desc_turkish = desc_tr.get(desc_en, desc_en)  # Bulamazsa İngilizce bırak

        weather_info = {
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "description": desc_turkish
        }
        return weather_info
