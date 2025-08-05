// Simple demo script to test the Weather API
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
    console.log('🌤️  Weather API Demo\n');

    try {
        // Test 1: Get API info
        console.log('1. Testing API root endpoint...');
        const rootResponse = await axios.get(`${API_BASE_URL}/`);
        console.log('✅ API is running:', rootResponse.data.message);
        console.log('📍 Available endpoints:', Object.keys(rootResponse.data.endpoints));

        // Test 2: Health check
        console.log('\n2. Testing health check...');
        const healthResponse = await axios.get(`${API_BASE_URL}/health`);
        console.log('✅ Health status:', healthResponse.data.status);

        // Test 3: Current weather (using demo data)
        console.log('\n3. Testing current weather endpoint...');
        const weatherResponse = await axios.get(`${API_BASE_URL}/weather/current`, {
            params: { q: 'London' }
        });
        console.log('✅ Weather data received for:', weatherResponse.data.location.name);
        console.log('🌡️  Current temperature:', weatherResponse.data.temperature.current + '°C');
        console.log('☁️  Weather:', weatherResponse.data.weather.description);

        console.log('\n🎉 All API endpoints are working correctly!');
        
    } catch (error) {
        console.error('❌ Error testing API:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
}

// Run the demo
testAPI();
