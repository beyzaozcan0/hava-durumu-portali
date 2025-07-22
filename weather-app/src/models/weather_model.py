class Weather:
    def __init__(self, temperature, humidity, description):
        self.temperature = temperature
        self.humidity = humidity
        self.description = description

    def display_weather(self):
        return (f"Temperature: {self.temperature}°C\n"
                f"Humidity: {self.humidity}%\n"
                f"Description: {self.description}")