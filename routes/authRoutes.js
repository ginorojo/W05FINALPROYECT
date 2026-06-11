const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: GitHub OAuth Authentication
 */

/**
 * @swagger
 * /api/auth/github:
 *   get:
 *     summary: Login with GitHub
 *     description: This endpoint redirects to GitHub for authentication.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to GitHub OAuth page.
 */
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

/**
 * @swagger
 * /api/auth/github/callback:
 *   get:
 *     summary: GitHub callback URL
 *     description: Used internally by GitHub.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to /api-docs on success.
 */
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api/auth/error' }),
  (req, res) => {
    // Redirigir automáticamente a Swagger
    res.redirect('/api-docs');
  }
);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout user
 *     description: Logs out the current user and clears the session. You can test this by visiting /api/auth/logout in your browser.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to GitHub login page after logout.
 */
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/api/auth/github');
    });
});

router.get('/error', (req, res) => {
    res.status(401).json({ error: true, message: "Authentication failed." });
});

module.exports = router;
