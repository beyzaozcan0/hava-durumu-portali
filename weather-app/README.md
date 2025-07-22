# Weather Application

This is a simple weather application that fetches and displays weather data for a specified city. It is built using Python and utilizes various modules to organize the code effectively.

## Project Structure

```
weather-app
├── src
│   ├── main.py          # Entry point of the application
│   ├── services
│   │   └── weather_service.py  # Contains the WeatherService class for fetching weather data
│   ├── models
│   │   └── weather_model.py     # Contains the Weather class for weather data representation
│   └── utils
│       └── helpers.py           # Contains utility functions for formatting and logging
├── requirements.txt      # Lists the dependencies required for the project
└── README.md             # Documentation for the project
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd weather-app
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

To run the application, execute the following command:
```
python src/main.py
```

You will be prompted to enter a city name, and the application will display the current weather information for that city.

## Features

- Fetches real-time weather data for any specified city.
- Displays temperature, humidity, and weather description.
- User-friendly output format.
- Error handling for invalid city names or network issues.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.