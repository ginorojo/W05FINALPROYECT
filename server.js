require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport');
const { ensureAuthenticated } = require('./middlewares/auth');

const app = express();

app.use(session({
    secret: process.env.JWT_SECRET || 'fallback_secret_for_session',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

app.use(passport.initialize());
app.use(passport.session());

// Redirigir la ruta principal (localhost:3000) directamente a los docs (y si no está logueado, lo mandará a GitHub)
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// Proteger toda la documentación de Swagger con el middleware de sesión
app.use('/api-docs', ensureAuthenticated);

const setupSwagger = require('./swagger');
const errorHandler = require('./middlewares/errorHandler');

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const pokemonRoutes = require('./routes/pokemonRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const gymRoutes = require('./routes/gymRoutes');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Setup Swagger Documentation at /api-docs
setupSwagger(app);

// Routes
app.use('/api/pokemons', pokemonRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler Middleware
app.use(errorHandler);

// Start the server (Using process.env.PORT for Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
