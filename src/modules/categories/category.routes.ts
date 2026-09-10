import { Router } from "express";
import { CategoryController } from "./category.controller";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();
const categoryController = new CategoryController();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestión de categorías
 */

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Crear una categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *           example:
 *             name: Universidad
 *             description: Tareas relacionadas con la universidad
 *     responses:
 *       201:
 *         description: Categoría creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Datos inválidos
 */
router.post("/", asyncHandler(categoryController.create));

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", asyncHandler(categoryController.findAll));

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68c123456789abcdef123456
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id", asyncHandler(categoryController.findById));

/**
 * @swagger
 * /api/v1/category/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68c123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategory'
 *           example:
 *             name: Estudios
 *             description: Tareas de estudio y universidad
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Categoría no encontrada
 */
router.put("/:id", asyncHandler(categoryController.update));

/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68c123456789abcdef123456
 *     responses:
 *       204:
 *         description: Categoría eliminada correctamente
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/:id", asyncHandler(categoryController.delete));

export default router;