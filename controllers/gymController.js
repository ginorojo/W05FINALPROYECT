const Gym = require('../models/Gym');

exports.getAllGyms = async (req, res, next) => {
    try {
        const gyms = await Gym.find();
        res.status(200).json(gyms);
    } catch (error) {
        next(error);
    }
};

exports.getGymById = async (req, res, next) => {
    try {
        const gym = await Gym.findById(req.params.id);
        if (!gym) {
            const error = new Error("Gym not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(gym);
    } catch (error) {
        next(error);
    }
};

exports.createGym = async (req, res, next) => {
    try {
        const newGym = new Gym(req.body);
        const savedGym = await newGym.save();
        res.status(201).json(savedGym);
    } catch (error) {
        next(error);
    }
};

exports.updateGym = async (req, res, next) => {
    try {
        const updatedGym = await Gym.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedGym) {
            const error = new Error("Gym not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(updatedGym);
    } catch (error) {
        next(error);
    }
};

exports.deleteGym = async (req, res, next) => {
    try {
        const deletedGym = await Gym.findByIdAndDelete(req.params.id);
        if (!deletedGym) {
            const error = new Error("Gym not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "Gym deleted successfully" });
    } catch (error) {
        next(error);
    }
};
