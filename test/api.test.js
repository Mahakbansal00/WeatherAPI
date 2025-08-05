const request = require('supertest');
const app = require('../server');

describe('Weather API', () => {
    describe('GET /', () => {
        it('should return API information', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('endpoints');
        });
    });

    describe('GET /api/health', () => {
        it('should return health status', async () => {
            const res = await request(app).get('/api/health');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status', 'healthy');
            expect(res.body).toHaveProperty('timestamp');
            expect(res.body).toHaveProperty('uptime');
        });
    });

    describe('GET /api/weather/current', () => {
        it('should return error for missing city parameter', async () => {
            const res = await request(app).get('/api/weather/current');
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error', 'City name is required');
        });
    });

    describe('GET /api/weather/forecast', () => {
        it('should return error for missing city parameter', async () => {
            const res = await request(app).get('/api/weather/forecast');
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error', 'City name is required');
        });
    });

    describe('GET /api/weather/coordinates', () => {
        it('should return error for missing coordinates', async () => {
            const res = await request(app).get('/api/weather/coordinates');
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toMatch(/required/);
        });
    });
});
