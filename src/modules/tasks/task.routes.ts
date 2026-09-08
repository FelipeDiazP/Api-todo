import { Router } from "express";
import { TaskController } from "./task.controller";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();

const taskController = new TaskController();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operaciones relacionadas con las tareas
 */

/**
 * @swagger
 * /api/v1/task:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Aprender Swagger"
 *               description:
 *                 type: string
 *                 example: "Documentar la API de tareas"
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", asyncHandler(taskController.create));

/**
 * @swagger
 * /api/v1/task:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", asyncHandler(taskController.findAll));

/**
 * @swagger
 * /api/v1/task/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64f123abc456def789012345"
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/:id", asyncHandler(taskController.findById));

/**
 * @swagger
 * /api/v1/task/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64f123abc456def789012345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Aprender Swagger y OpenAPI"
 *               description:
 *                 type: string
 *                 example: "Actualizar la descripción de la tarea"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *       404:
 *         description: Tarea no encontrada
 */
router.put("/:id", asyncHandler(taskController.update));

/**
 * @swagger
 * /api/v1/task/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64f123abc456def789012345"
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/:id", asyncHandler(taskController.delete));

export default router;