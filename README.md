# Weather API Backend

A comprehensive RESTful weather API built with Node.js and Express.js that provides current weather data, forecasts, and weather information by coordinates using the OpenWeatherMap API.

## Features

- 🌤️ Current weather data by city name
- 📅 5-day weather forecast
- 📍 Weather data by coordinates (latitude/longitude)
- 🚀 Fast response with caching
- 🔒 Rate limiting and error handling
- 📊 Health check endpoint
- 📝 Comprehensive API documentation

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (get it free from [OpenWeatherMap](https://openweathermap.org/api))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-api-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your OpenWeatherMap API key to `.env`:
```bash
WEATHER_API_KEY=your_actual_api_key_here
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get Current Weather
```http
GET /api/weather/current?q={city_name}
```

**Parameters:**
- `q` (required): City name (e.g., "London", "New York")

**Example:**
```http
GET /api/weather/current?q=London
```

**Response:**
```json
{
  "location": {
    "name": "London",
    "country": "GB",
    "coordinates": {
      "lat": 51.5074,
      "lon": -0.1278
    }
  },
  "weather": {
    "main": "Clouds",
    "description": "scattered clouds",
    "icon": "03d"
  },
  "temperature": {
    "current": 15.5,
    "feelsLike": 14.2,
    "min": 13.0,
    "max": 18.0
  },
  "humidity": 72,
  "pressure": 1013,
  "wind": {
    "speed": 3.5,
    "direction": 250
  }
}
```

#### 2. Get Weather Forecast
```http
GET /api/weather/forecast?q={city_name}&days={days}
```

**Parameters:**
- `q` (required): City name
- `days` (optional): Number of days (default: 5, max: 5)

**Example:**
```http
GET /api/weather/forecast?q=London&days=3
```

#### 3. Get Weather by Coordinates
```http
GET /api/weather/coordinates?lat={latitude}&lon={longitude}
```

**Parameters:**
- `lat` (required): Latitude
- `lon` (required): Longitude

**Example:**
```http
GET /api/weather/coordinates?lat=51.5074&lon=-0.1278
```

#### 4. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `400` - Bad Request (missing parameters)
- `404` - Not Found (city not found)
- `401` - Unauthorized (invalid API key)
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "error": "Error message"
}
```

## Rate Limiting

The API implements basic rate limiting and caching to optimize performance:
- **Cache Duration**: 10 minutes
- **Rate Limit**: 100 requests per 15 minutes (configurable)

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

### Project Structure

```
weather-api-backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .env               # Environment variables (create from .env.example)
├── README.md          # This file
└── node_modules/      # Dependencies
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `WEATHER_API_KEY` | OpenWeatherMap API key | Required |
| `CORS_ORIGIN` | CORS allowed origin | `http://localhost:3000` |

## Testing

Run the test suite:
```bash
npm test
```

## Deployment

### Using Docker

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Using PM2

```bash
npm install -g pm2
pm2 start server.js --name weather-api
```

### Using Heroku

1. Add Procfile:
```
web: node server.js
```

2. Deploy:
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue or contact the development team.
