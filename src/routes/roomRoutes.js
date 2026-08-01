const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Lista as salas disponíveis para reserva
 *     tags: [Salas]
 *     responses:
 *       200:
 *         description: Lista de salas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/salas', roomController.getRooms);

module.exports = router;
