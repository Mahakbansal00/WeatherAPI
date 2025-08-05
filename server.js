const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Weather API configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'demo-key';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

// Cache for API responses (simple in-memory cache)
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Helper function to get cached data
function getCachedData(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    return null;
}

// Helper function to set cached data
function setCachedData(key, data) {
    cache.set(key, {
        data,
        timestamp: Date.now()
    });
}

// Routes

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Weather API is running!',
        endpoints: {
            current: '/api/weather/current?q={city}',
            forecast: '/api/weather/forecast?q={city}',
            coordinates: '/api/weather/coordinates?lat={lat}&lon={lon}'
        }
    });
});

// Get current weather by city name
app.get('/api/weather/current', async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({ error: 'City name is required' });
        }

        const cacheKey = `current_${q}`;
        const cachedData = getCachedData(cacheKey);
        
        if (cachedData) {
            return res.json(cachedData);
        }

        const response = await axios.get(`${WEATHER_API_URL}/weather`, {
            params: {
                q,
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        });

        const weatherData = {
            location: {
                name: response.data.name,
                country: response.data.sys.country,
                coordinates: {
                    lat: response.data.coord.lat,
                    lon: response.data.coord.lon
                }
            },
            weather: {
                main: response.data.weather[0].main,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon
            },
            temperature: {
                current: response.data.main.temp,
                feelsLike: response.data.main.feels_like,
                min: response.data.main.temp_min,
                max: response.data.main.temp_max
            },
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            wind: {
                speed: response.data.wind?.speed || 0,
                direction: response.data.wind?.deg || 0
            },
            visibility: response.data.visibility,
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset,
            timestamp: response.data.dt
        };

        setCachedData(cacheKey, weatherData);
        res.json(weatherData);

    } catch (error) {
        if (error.response?.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else if (error.response?.status === 401) {
            res.status(401).json({ error: 'Invalid API key' });
        } else {
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }
});

// Get weather forecast by city name
app.get('/api/weather/forecast', async (req, res) => {
    try {
        const { q, days = 5 } = req.query;
        
        if (!q) {
            return res.status(400).json({ error: 'City name is required' });
        }

        const cacheKey = `forecast_${q}_${days}`;
        const cachedData = getCachedData(cacheKey);
        
        if (cachedData) {
            return res.json(cachedData);
        }

        const response = await axios.get(`${WEATHER_API_URL}/forecast`, {
            params: {
                q,
                appid: WEATHER_API_KEY,
                units: 'metric',
                cnt: days * 8 // 8 forecasts per day (every 3 hours)
            }
        });

        const forecastData = {
            location: {
                name: response.data.city.name,
                country: response.data.city.country,
                coordinates: {
                    lat: response.data.city.coord.lat,
                    lon: response.data.city.coord.lon
                }
            },
            forecast: response.data.list.map(item => ({
                date: item.dt_txt,
                temperature: {
                    current: item.main.temp,
                    feelsLike: item.main.feels_like,
                    min: item.main.temp_min,
                    max: item.main.temp_max
                },
                weather: {
                    main: item.weather[0].main,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                },
                humidity: item.main.humidity,
                wind: {
                    speed: item.wind?.speed || 0,
                    direction: item.wind?.deg || 0
                },
                probability: item.pop || 0
            }))
        };

        setCachedData(cacheKey, forecastData);
        res.json(forecastData);

    } catch (error) {
        if (error.response?.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else if (error.response?.status === 401) {
            res.status(401).json({ error: 'Invalid API key' });
        } else {
            res.status(500).json({ error: 'Failed to fetch forecast data' });
        }
    }
});

// Get weather by coordinates
app.get('/api/weather/coordinates', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const cacheKey = `coordinates_${lat}_${lon}`;
        const cachedData = getCachedData(cacheKey);
        
        if (cachedData) {
            return res.json(cachedData);
        }

        const [currentResponse, forecastResponse] = await Promise.all([
            axios.get(`${WEATHER_API_URL}/weather`, {
                params: {
                    lat,
                    lon,
                    appid: WEATHER_API_KEY,
                    units: 'metric'
                }
            }),
            axios.get(`${WEATHER_API_URL}/forecast`, {
                params: {
                    lat,
                    lon,
                    appid: WEATHER_API_KEY,
                    units: 'metric',
                    cnt: 40
                }
            })
        ]);

        const weatherData = {
            current: {
                location: {
                    name: currentResponse.data.name,
                    country: currentResponse.data.sys.country,
                    coordinates: {
                        lat: currentResponse.data.coord.lat,
                        lon: currentResponse.data.coord.lon
                    }
                },
                weather: {
                    main: currentResponse.data.weather[0].main,
                    description: currentResponse.data.weather[0].description,
                    icon: currentResponse.data.weather[0].icon
                },
                temperature: {
                    current: currentResponse.data.main.temp,
                    feelsLike: currentResponse.data.main.feels_like,
                    min: currentResponse.data.main.temp_min,
                    max: currentResponse.data.main.temp_max
                },
                humidity: currentResponse.data.main.humidity,
                pressure: currentResponse.data.main.pressure,
                wind: {
                    speed: currentResponse.data.wind?.speed || 0,
                    direction: currentResponse.data.wind?.deg || 0
                }
            },
            forecast: forecastResponse.data.list.map(item => ({
                date: item.dt_txt,
                temperature: {
                    current: item.main.temp,
                    feelsLike: item.main.feels_like,
                    min: item.main.temp_min,
                    max: item.main.temp_max
                },
                weather: {
                    main: item.weather[0].main,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                },
                humidity: item.main.humidity,
                wind: {
                    speed: item.wind?.speed || 0,
                    direction: item.wind?.deg || 0
                },
                probability: item.pop || 0
            }))
        };

        setCachedData(cacheKey, weatherData);
        res.json(weatherData);

    } catch (error) {
        if (error.response?.status === 400) {
            res.status(400).json({ error: 'Invalid coordinates' });
        } else if (error.response?.status === 401) {
            res.status(401).json({ error: 'Invalid API key' });
        } else {
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Weather API server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
