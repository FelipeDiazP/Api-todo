import { Router } from "express";

import {
  createStatisticsController,
  getAllStatisticsController,
  getStatisticsByIdController,
  updateStatisticsController,
  deleteStatisticsController,
} from "../statistics/statistics.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: Gestión de estadísticas
 */

/**
 * @swagger
 * /api/v1/statistics:
 *   post:
 *     summary: Crear una estadística
 *     tags: [Statistics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatisticsInput'
 *           example:
 *             name: "Estadísticas generales"
 *             total: 20
 *             completed: 12
 *             pending: 8
 *     responses:
 *       201:
 *         description: Estadística creada correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: "Estadística creada correctamente"
 *               statistics:
 *                 _id: "68d3a8c5f1e2a12345678901"
 *                 name: "Estadísticas generales"
 *                 total: 20
 *                 completed: 12
 *                 pending: 8
 *                 completionPercentage: 60
 *                 createdAt: "2026-09-24T15:30:00.000Z"
 *                 updatedAt: "2026-09-24T15:30:00.000Z"
 *       400:
 *         description: Datos obligatorios faltantes
 *       500:
 *         description: Error del servidor
 */
router.post("/", createStatisticsController);

/**
 * @swagger
 * /api/v1/statistics:
 *   get:
 *     summary: Obtener todas las estadísticas
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Lista de estadísticas
 *         content:
 *           application/json:
 *             example:
 *               statistics:
 *                 - _id: "68d3a8c5f1e2a12345678901"
 *                   name: "Estadísticas generales"
 *                   total: 20
 *                   completed: 12
 *                   pending: 8
 *                   completionPercentage: 60
 *                   createdAt: "2026-09-24T15:30:00.000Z"
 *                   updatedAt: "2026-09-24T15:30:00.000Z"
 *                 - _id: "68d3a8c5f1e2a12345678902"
 *                   name: "Tareas del proyecto"
 *                   total: 10
 *                   completed: 7
 *                   pending: 3
 *                   completionPercentage: 70
 *                   createdAt: "2026-09-24T16:00:00.000Z"
 *                   updatedAt: "2026-09-24T16:00:00.000Z"
 *       500:
 *         description: Error del servidor
 */
router.get("/", getAllStatisticsController);

/**
 * @swagger
 * /api/v1/statistics/{id}:
 *   get:
 *     summary: Obtener una estadística por ID
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la estadística
 *         example: "68d3a8c5f1e2a12345678901"
 *     responses:
 *       200:
 *         description: Estadística encontrada
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Estadística no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", getStatisticsByIdController);

/**
 * @swagger
 * /api/v1/statistics/{id}:
 *   put:
 *     summary: Actualizar una estadística
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la estadística
 *         example: "68d3a8c5f1e2a12345678901"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatisticsUpdate'
 *           example:
 *             name: "Estadísticas actualizadas"
 *             total: 25
 *             completed: 20
 *             pending: 5
 *     responses:
 *       200:
 *         description: Estadística actualizada correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Estadística no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", updateStatisticsController);

/**
 * @swagger
 * /api/v1/statistics/{id}:
 *   delete:
 *     summary: Eliminar una estadística
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la estadística
 *         example: "68d3a8c5f1e2a12345678901"
 *     responses:
 *       200:
 *         description: Estadística eliminada correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: "Estadística eliminada correctamente"
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Estadística no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", deleteStatisticsController);

export default router;