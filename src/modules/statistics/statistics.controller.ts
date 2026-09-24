import { Request, Response } from "express";

import {
  createStatistics,
  getAllStatistics,
  getStatisticsById,
  updateStatistics,
  deleteStatistics,
} from "../statistics/statistics.service";

export async function createStatisticsController(req: Request, res: Response) {
  try {
    const { name, total, completed, pending } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "El nombre es obligatorio",
      });
    }

    if (
      total === undefined ||
      completed === undefined ||
      pending === undefined
    ) {
      return res.status(400).json({
        message: "total, completed y pending son obligatorios",
      });
    }

    const statistics = await createStatistics({
      name,
      total,
      completed,
      pending,
    });

    return res.status(201).json({
      message: "Estadística creada correctamente",
      statistics,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al crear la estadística",
    });
  }
}

export async function getAllStatisticsController(_req: Request, res: Response) {
  try {
    const statistics = await getAllStatistics();

    return res.status(200).json({
      statistics,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener las estadísticas",
    });
  }
}

export async function getStatisticsByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID de estadística inválido",
      });
    }

    const statistics = await getStatisticsById(id);

    if (!statistics) {
      return res.status(404).json({
        message: "Estadística no encontrada",
      });
    }

    return res.status(200).json({
      statistics,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function updateStatisticsController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID de estadística inválido",
      });
    }

    const statistics = await updateStatistics(id, req.body);

    if (!statistics) {
      return res.status(404).json({
        message: "Estadística no encontrada",
      });
    }

    return res.status(200).json({
      message: "Estadística actualizada correctamente",
      statistics,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function deleteStatisticsController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID de estadística inválido",
      });
    }

    const deleted = await deleteStatistics(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Estadística no encontrada",
      });
    }

    return res.status(200).json({
      message: "Estadística eliminada correctamente",
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      message: error.message,
    });
  }
}
