const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');
const { ensureAuthenticated } = require('../middlewares/auth');
const { validateGym } = require('../middlewares/validator');

/**
 * @swagger
 * tags:
 *   name: Gyms
 *   description: Gym management API
 */

/**
 * @swagger
 * /api/gyms:
 *   get:
 *     summary: Returns a list of all Gyms
 *     tags: [Gyms]
 *     responses:
 *       200:
 *         description: A list of Gyms
 *       500:
 *         description: Server error
 */
router.get('/', gymController.getAllGyms);

/**
 * @swagger
 * /api/gyms/{id}:
 *   get:
 *     summary: Get a gym by id
 *     tags: [Gyms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The gym id (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: The gym data
 *       404:
 *         description: Gym not found
 *       500:
 *         description: Server error
 */
router.get('/:id', gymController.getGymById);

/**
 * @swagger
 * /api/gyms:
 *   post:
 *     summary: Create a new gym
 *     tags: [Gyms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - leaderName
 *               - badgeName
 *               - region
 *             properties:
 *               name:
 *                 type: string
 *               leaderName:
 *                 type: string
 *               badgeName:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gym created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', ensureAuthenticated, validateGym, gymController.createGym);

/**
 * @swagger
 * /api/gyms/{id}:
 *   put:
 *     summary: Update an existing gym
 *     tags: [Gyms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The gym id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               leaderName:
 *                 type: string
 *               badgeName:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gym updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Gym not found
 *       500:
 *         description: Server error
 */
router.put('/:id', ensureAuthenticated, validateGym, gymController.updateGym);

/**
 * @swagger
 * /api/gyms/{id}:
 *   delete:
 *     summary: Delete a gym
 *     tags: [Gyms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The gym id
 *     responses:
 *       200:
 *         description: Gym deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Gym not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', ensureAuthenticated, gymController.deleteGym);

module.exports = router;
