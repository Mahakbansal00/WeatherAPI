# 🔧 API Key Setup Instructions

## Getting Your OpenWeatherMap API Key

1. **Visit OpenWeatherMap:**
   - Go to https://openweathermap.org/api
   - Click "Sign Up" or "Log In"

2. **Get Free API Key:**
   - After logging in, go to https://home.openweathermap.org/api_keys
   - Generate a new API key (it's free for basic usage)

3. **Create .env file:**
   ```bash
   # Create .env file in the project root
   echo "WEATHER_API_KEY=your_actual_api_key_here" > .env
   ```

4. **Replace with your actual key:**
   ```bash
   # Example (replace with your real key)
   echo "WEATHER_API_KEY=1234567890abcdef1234567890abcdef" > .env
   ```

## Quick Setup Commands

```bash
# 1. Get your API key from https://openweathermap.org/api
# 2. Create .env file
echo "WEATHER_API_KEY=your_api_key_here" > .env

# 3. Start the server
npm start

# 4. Test with demo
node demo.js
```

## Testing Without API Key (Demo Mode)

If you don't have an API key yet, you can test the system structure:

```bash
# The server will run with demo responses
# Web interface will show proper error messages
# API endpoints will return structured error responses
```

## Verify Setup

After adding your API key:
```bash
# Test Delhi weather
curl "http://localhost:8080/api/weather/current?q=Delhi"

# Test Gurgaon weather
curl "http://localhost:8080/api/weather/current?q=Gurgaon"
```

## Troubleshooting

- **"Invalid API key"**: Check your .env file format
- **"City not found"**: Ensure city name is spelled correctly
- **Rate limiting**: Free tier allows 60 calls/minute
- **Network issues**: Check internet connection
