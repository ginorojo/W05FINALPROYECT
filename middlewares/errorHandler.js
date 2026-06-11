const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Default to 500 server error
    const statusCode = err.statusCode || 500;
    const message = err.message || "Detalle del error";
    
    res.status(statusCode).json({
        error: true,
        message: message
    });
};

module.exports = errorHandler;
