const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    
    // Si la petición es para ver los docs en el navegador o la raíz, redirigimos a GitHub
    if (req.originalUrl.includes('/api-docs') || req.originalUrl === '/') {
        return res.redirect('/api/auth/github');
    }
    
    // Si es una petición API directa a un endpoint sin sesión, devolvemos 401
    res.status(401).json({ error: true, message: 'Unauthorized: Please log in first' });
};

module.exports = { ensureAuthenticated };
