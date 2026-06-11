const Item = require('../models/Item');

exports.getAllItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};

exports.getItemById = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            const error = new Error("Item not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};

exports.createItem = async (req, res, next) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        next(error);
    }
};

exports.updateItem = async (req, res, next) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedItem) {
            const error = new Error("Item not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        next(error);
    }
};

exports.deleteItem = async (req, res, next) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            const error = new Error("Item not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        next(error);
    }
};
