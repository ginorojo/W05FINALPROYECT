const request = require('supertest');
const express = require('express');

// Setup mock app instance for Supertest
const app = express();

const pokemonRoutes = require('../routes/pokemonRoutes');
const trainerRoutes = require('../routes/trainerRoutes');
const gymRoutes = require('../routes/gymRoutes');
const itemRoutes = require('../routes/itemRoutes');

app.use(express.json());
app.use('/api/pokemons', pokemonRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/items', itemRoutes);

// Mock the controllers to avoid requiring a real MongoDB connection for unit testing routes
jest.mock('../controllers/pokemonController', () => ({
    getAllPokemons: (req, res) => res.status(200).json([{ name: "Test Pokemon" }]),
    getPokemonById: (req, res) => res.status(200).json({ name: "Test Pokemon" }),
    createPokemon: jest.fn(),
    updatePokemon: jest.fn(),
    deletePokemon: jest.fn()
}));

jest.mock('../controllers/trainerController', () => ({
    getAllTrainers: (req, res) => res.status(200).json([{ name: "Test Trainer" }]),
    getTrainerById: (req, res) => res.status(200).json({ name: "Test Trainer" }),
    createTrainer: jest.fn(),
    updateTrainer: jest.fn(),
    deleteTrainer: jest.fn()
}));

jest.mock('../controllers/gymController', () => ({
    getAllGyms: (req, res) => res.status(200).json([{ name: "Test Gym" }]),
    getGymById: (req, res) => res.status(200).json({ name: "Test Gym" }),
    createGym: jest.fn(),
    updateGym: jest.fn(),
    deleteGym: jest.fn()
}));

jest.mock('../controllers/itemController', () => ({
    getAllItems: (req, res) => res.status(200).json([{ name: "Test Item" }]),
    getItemById: (req, res) => res.status(200).json({ name: "Test Item" }),
    createItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn()
}));

describe('API GET Endpoints Unit Tests', () => {
    // ---- GetAll Tests ----
    test('GET /api/pokemons should return 200 OK', async () => {
        const response = await request(app).get('/api/pokemons');
        expect(response.status).toBe(200);
    });

    test('GET /api/trainers should return 200 OK', async () => {
        const response = await request(app).get('/api/trainers');
        expect(response.status).toBe(200);
    });

    test('GET /api/gyms should return 200 OK', async () => {
        const response = await request(app).get('/api/gyms');
        expect(response.status).toBe(200);
    });

    test('GET /api/items should return 200 OK', async () => {
        const response = await request(app).get('/api/items');
        expect(response.status).toBe(200);
    });

    // ---- GetById Tests ----
    test('GET /api/pokemons/:id should return 200 OK', async () => {
        const response = await request(app).get('/api/pokemons/1');
        expect(response.status).toBe(200);
    });

    test('GET /api/trainers/:id should return 200 OK', async () => {
        const response = await request(app).get('/api/trainers/1');
        expect(response.status).toBe(200);
    });

    test('GET /api/gyms/:id should return 200 OK', async () => {
        const response = await request(app).get('/api/gyms/some-mongo-id');
        expect(response.status).toBe(200);
    });

    test('GET /api/items/:id should return 200 OK', async () => {
        const response = await request(app).get('/api/items/some-mongo-id');
        expect(response.status).toBe(200);
    });
});
