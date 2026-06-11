const Pokemon = require('../models/Pokemon');

exports.getAllPokemons = async (req, res, next) => {
    try {
        const pokemons = await Pokemon.find();
        res.status(200).json(pokemons);
    } catch (error) {
        next(error);
    }
};

exports.getPokemonById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const pokemon = await Pokemon.findOne({ id: id });
        if (!pokemon) {
            const error = new Error("Pokemon not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(pokemon);
    } catch (error) {
        next(error);
    }
};

exports.createPokemon = async (req, res, next) => {
    try {
        const newPokemon = new Pokemon(req.body);
        const savedPokemon = await newPokemon.save();
        res.status(201).json(savedPokemon);
    } catch (error) {
        if (error.code === 11000) {
            error.statusCode = 400;
            error.message = "Duplicate ID";
        }
        next(error);
    }
};

exports.updatePokemon = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const updatedPokemon = await Pokemon.findOneAndUpdate({ id: id }, req.body, { new: true, runValidators: true });
        
        if (!updatedPokemon) {
            const error = new Error("Pokemon not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(updatedPokemon);
    } catch (error) {
        next(error);
    }
};

exports.deletePokemon = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const deletedPokemon = await Pokemon.findOneAndDelete({ id: id });
        
        if (!deletedPokemon) {
            const error = new Error("Pokemon not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "Pokemon deleted successfully" });
    } catch (error) {
        next(error);
    }
};
