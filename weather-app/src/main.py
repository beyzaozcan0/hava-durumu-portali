def main():
    print("Weather Application")
    city = input("Enter the city name: ")
    
    from services.weather_service import WeatherService
    weather_service = WeatherService()
    
    weather_data = weather_service.fetch_weather(city)
    if weather_data:
        weather_info = weather_service.parse_weather(weather_data)
        print(weather_info)
    else:
        print("Could not retrieve weather data.")

if __name__ == "__main__":
    main()