const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const { ensureAuthenticated } = require('../middlewares/auth');
const { validateTrainer } = require('../middlewares/validator');

/**
 * @swagger
 * tags:
 *   name: Trainers
 *   description: Trainer management API
 */

/**
 * @swagger
 * /api/trainers:
 *   get:
 *     summary: Returns a list of all Trainers
 *     tags: [Trainers]
 *     responses:
 *       200:
 *         description: A list of Trainers
 *       500:
 *         description: Server error
 */
router.get('/', trainerController.getAllTrainers);

/**
 * @swagger
 * /api/trainers/{id}:
 *   get:
 *     summary: Get a trainer by id
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The trainer id
 *     responses:
 *       200:
 *         description: The trainer data
 *       404:
 *         description: Trainer not found
 *       500:
 *         description: Server error
 */
router.get('/:id', trainerController.getTrainerById);

/**
 * @swagger
 * /api/trainers:
 *   post:
 *     summary: Create a new trainer
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               region:
 *                 type: string
 *               badgeCount:
 *                 type: integer
 *                 description: Must be between 0 and 8
 *               teamPokemonIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Max 6 pokemon IDs
 *     responses:
 *       201:
 *         description: Trainer created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', ensureAuthenticated, validateTrainer, trainerController.createTrainer);

/**
 * @swagger
 * /api/trainers/{id}:
 *   put:
 *     summary: Update an existing trainer
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The trainer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               region:
 *                 type: string
 *               badgeCount:
 *                 type: integer
 *               teamPokemonIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Trainer updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trainer not found
 *       500:
 *         description: Server error
 */
router.put('/:id', ensureAuthenticated, validateTrainer, trainerController.updateTrainer);

/**
 * @swagger
 * /api/trainers/{id}:
 *   delete:
 *     summary: Delete a trainer
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The trainer id
 *     responses:
 *       200:
 *         description: Trainer deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trainer not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', ensureAuthenticated, trainerController.deleteTrainer);

module.exports = router;
