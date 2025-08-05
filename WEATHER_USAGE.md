# 🌤️ Weather Checker - Usage Guide

## Overview
This weather checking system allows you to check weather information for cities like Delhi, Gurgaon, and any city worldwide using the OpenWeatherMap API.

## Quick Start

### 1. Start the Server
```bash
npm start
```
The server will start on `http://localhost:8080`

### 2. Check Weather via API
You can use the API endpoints directly:

**Current Weather:**
```
GET http://localhost:8080/api/weather/current?q=Delhi
```

**Weather Forecast (5 days):**
```
GET http://localhost:8080/api/weather/forecast?q=Gurgaon
```

### 3. Use the Web Interface
Open `weather-checker.html` in your browser for a user-friendly interface.

## Available Cities
You can check weather for any city worldwide. Some popular Indian cities:
- **Delhi** - Capital of India
- **Gurgaon** - Haryana
- **Mumbai** - Maharashtra
- **Bangalore** - Karnataka
- **Chennai** - Tamil Nadu
- **Kolkata** - West Bengal
- **Hyderabad** - Telangana
- **Pune** - Maharashtra

## API Endpoints

| Endpoint | Description | Example |
|----------|-------------|---------|
| `/api/weather/current` | Current weather by city name | `?q=Delhi` |
| `/api/weather/forecast` | 5-day forecast by city name | `?q=Gurgaon` |
| `/api/weather/coordinates` | Weather by coordinates | `?lat=28.6139&lon=77.2090` |
| `/api/health` | Server health check | - |

## Sample Usage

### Via Browser
1. Open `weather-checker.html`
2. Enter city name (e.g., "Delhi" or "Gurgaon")
3. Click "Search" or use quick city buttons

### Via API
```javascript
// Check Delhi weather
fetch('http://localhost:8080/api/weather/current?q=Delhi')
  .then(res => res.json())
  .then(data => console.log(data));

// Check Gurgaon forecast
fetch('http://localhost:8080/api/weather/forecast?q=Gurgaon')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Via Demo Script
```bash
node demo.js
```

## Environment Setup
1. Copy `.env.example` to `.env`
2. Add your OpenWeatherMap API key:
   ```
   WEATHER_API_KEY=your_api_key_here
   ```

## Features
- ✅ Real-time weather data
- ✅ 5-day weather forecast
- ✅ City-based weather checking
- ✅ Caching for better performance
- ✅ Responsive web interface
- ✅ Error handling
- ✅ Quick city buttons

## Troubleshooting
- Ensure the server is running on port 8080
- Check your internet connection
- Verify API key is set in .env file
- Clear browser cache if interface issues occur
