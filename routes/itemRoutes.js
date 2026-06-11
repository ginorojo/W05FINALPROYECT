const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { ensureAuthenticated } = require('../middlewares/auth');
const { validateItem } = require('../middlewares/validator');

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management API
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Returns a list of all Items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: A list of Items
 *       500:
 *         description: Server error
 */
router.get('/', itemController.getAllItems);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get an item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item data
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.get('/:id', itemController.getItemById);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
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
 *               - category
 *               - effect
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Pokeball, Potion, Berry, TM]
 *               effect:
 *                 type: string
 *               cost:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', ensureAuthenticated, validateItem, itemController.createItem);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update an existing item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Pokeball, Potion, Berry, TM]
 *               effect:
 *                 type: string
 *               cost:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.put('/:id', ensureAuthenticated, validateItem, itemController.updateItem);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete an item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', ensureAuthenticated, itemController.deleteItem);

module.exports = router;
