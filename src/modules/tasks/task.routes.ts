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
 *             $ref: '#/components/schemas/CreateTask'
 *           example:
 *             title: "Estudiar para parcial"
 *             description: "Repasar vectores y ecuaciones del plano"
 *             isDone: false
 *             categoryId: "68c123456789abcdef123456"
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: La categoría indicada no existe
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             example:
 *               - _id: "68c987654321abcdef123456"
 *                 title: "Estudiar para parcial"
 *                 description: "Repasar vectores y ecuaciones del plano"
 *                 isDone: false
 *                 category: "Universidad"
 *                 createdAt: "2026-09-10T10:30:00.000Z"
 *                 updatedAt: "2026-09-10T10:30:00.000Z"
 *               - _id: "68c987654321abcdef654321"
 *                 title: "Comprar mercado"
 *                 description: "Comprar alimentos para la semana"
 *                 isDone: true
 *                 category: "Personal"
 *                 createdAt: "2026-09-09T18:20:00.000Z"
 *                 updatedAt: "2026-09-10T08:15:00.000Z"
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
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *         example: "68c987654321abcdef123456"
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               _id: "68c987654321abcdef123456"
 *               title: "Estudiar para parcial"
 *               description: "Repasar vectores y ecuaciones del plano"
 *               isDone: false
 *               category: "Universidad"
 *               createdAt: "2026-09-10T10:30:00.000Z"
 *               updatedAt: "2026-09-10T10:30:00.000Z"
 *       400:
 *         description: ID inválido
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
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *         example: "68c987654321abcdef123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *           example:
 *             title: "Estudiar para parcial de geometría"
 *             description: "Repasar vectores, rectas y ecuaciones del plano"
 *             isDone: true
 *             categoryId: "68c123456789abcdef123456"
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               _id: "68c987654321abcdef123456"
 *               title: "Estudiar para parcial de geometría"
 *               description: "Repasar vectores, rectas y ecuaciones del plano"
 *               isDone: true
 *               category: "Universidad"
 *               createdAt: "2026-09-10T10:30:00.000Z"
 *               updatedAt: "2026-09-10T12:45:00.000Z"
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Tarea o categoría no encontrada
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
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *         example: "68c987654321abcdef123456"
 *     responses:
 *       204:
 *         description: Tarea eliminada correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/:id", asyncHandler(taskController.delete));

export default router;