const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const { ensureAuthenticated } = require('../middlewares/auth');
const { validatePokemon } = require('../middlewares/validator');

/**
 * @swagger
 * tags:
 *   name: Pokemons
 *   description: Pokemon management API
 */

/**
 * @swagger
 * /api/pokemons:
 *   get:
 *     summary: Returns a list of all Pokemons
 *     tags: [Pokemons]
 *     responses:
 *       200:
 *         description: A list of Pokemons
 *       500:
 *         description: Server error
 */
router.get('/', pokemonController.getAllPokemons);

/**
 * @swagger
 * /api/pokemons/{id}:
 *   get:
 *     summary: Get a pokemon by id
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pokemon id
 *     responses:
 *       200:
 *         description: The pokemon data
 *       404:
 *         description: Pokemon not found
 *       500:
 *         description: Server error
 */
router.get('/:id', pokemonController.getPokemonById);

/**
 * @swagger
 * /api/pokemons:
 *   post:
 *     summary: Create a new pokemon
 *     tags: [Pokemons]
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
 *               - type1
 *               - hp
 *               - attack
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               type1:
 *                 type: string
 *               type2:
 *                 type: string
 *               hp:
 *                 type: integer
 *               attack:
 *                 type: integer
 *               defense:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pokemon created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', ensureAuthenticated, validatePokemon, pokemonController.createPokemon);

/**
 * @swagger
 * /api/pokemons/{id}:
 *   put:
 *     summary: Update an existing pokemon
 *     tags: [Pokemons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pokemon id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type1:
 *                 type: string
 *               type2:
 *                 type: string
 *               hp:
 *                 type: integer
 *               attack:
 *                 type: integer
 *               defense:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pokemon updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pokemon not found
 *       500:
 *         description: Server error
 */
router.put('/:id', ensureAuthenticated, validatePokemon, pokemonController.updatePokemon);

/**
 * @swagger
 * /api/pokemons/{id}:
 *   delete:
 *     summary: Delete a pokemon
 *     tags: [Pokemons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pokemon id
 *     responses:
 *       200:
 *         description: Pokemon deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pokemon not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', ensureAuthenticated, pokemonController.deletePokemon);

module.exports = router;
