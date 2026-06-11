const Trainer = require('../models/Trainer');

exports.getAllTrainers = async (req, res, next) => {
    try {
        const trainers = await Trainer.find();
        res.status(200).json(trainers);
    } catch (error) {
        next(error);
    }
};

exports.getTrainerById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const trainer = await Trainer.findOne({ id: id });
        if (!trainer) {
            const error = new Error("Trainer not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(trainer);
    } catch (error) {
        next(error);
    }
};

exports.createTrainer = async (req, res, next) => {
    try {
        const newTrainer = new Trainer(req.body);
        const savedTrainer = await newTrainer.save();
        res.status(201).json(savedTrainer);
    } catch (error) {
        if (error.code === 11000) {
            error.statusCode = 400;
            error.message = "Duplicate ID";
        }
        next(error);
    }
};

exports.updateTrainer = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const updatedTrainer = await Trainer.findOneAndUpdate({ id: id }, req.body, { new: true, runValidators: true });
        
        if (!updatedTrainer) {
            const error = new Error("Trainer not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(updatedTrainer);
    } catch (error) {
        next(error);
    }
};

exports.deleteTrainer = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const deletedTrainer = await Trainer.findOneAndDelete({ id: id });
        
        if (!deletedTrainer) {
            const error = new Error("Trainer not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "Trainer deleted successfully" });
    } catch (error) {
        next(error);
    }
};
