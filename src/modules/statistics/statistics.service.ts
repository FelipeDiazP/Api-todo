import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Statistics } from "../statistics/statistics.model";

const collectionName = "statistics";

export async function createStatistics(
  data: Omit<
    Statistics,
    "_id" | "completionPercentage" | "createdAt" | "updatedAt"
  >
) {
  const db = getDb();

  const statistics: Statistics = {
    name: data.name,
    total: data.total,
    completed: data.completed,
    pending: data.pending,

    completionPercentage:
      data.total === 0
        ? 0
        : Math.round((data.completed / data.total) * 100),

    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db
    .collection<Statistics>(collectionName)
    .insertOne(statistics);

  return {
    _id: result.insertedId,
    ...statistics,
  };
}

// OBTENER TODAS
export async function getAllStatistics() {
  const db = getDb();

  return await db
    .collection<Statistics>(collectionName)
    .find()
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getStatisticsById(id: string) {
  const db = getDb();

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de estadística inválido");
  }

  return await db
    .collection<Statistics>(collectionName)
    .findOne({
      _id: new ObjectId(id),
    });
}

// ACTUALIZAR
export async function updateStatistics(
  id: string,
  data: Partial<
    Omit<
      Statistics,
      "_id" | "completionPercentage" | "createdAt" | "updatedAt"
    >
  >
) {
  const db = getDb();

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de estadística inválido");
  }

  const existing = await db
    .collection<Statistics>(collectionName)
    .findOne({
      _id: new ObjectId(id),
    });

  if (!existing) {
    return null;
  }

  const total =
    data.total !== undefined
      ? data.total
      : existing.total;

  const completed =
    data.completed !== undefined
      ? data.completed
      : existing.completed;

  const pending =
    data.pending !== undefined
      ? data.pending
      : existing.pending;

  const updatedData = {
    ...(data.name !== undefined && {
      name: data.name,
    }),

    total,
    completed,
    pending,

    completionPercentage:
      total === 0
        ? 0
        : Math.round((completed / total) * 100),

    updatedAt: new Date(),
  };

  await db
    .collection<Statistics>(collectionName)
    .updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedData,
      }
    );

  return await getStatisticsById(id);
}

// ELIMINAR
export async function deleteStatistics(id: string) {
  const db = getDb();

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de estadística inválido");
  }

  const result = await db
    .collection<Statistics>(collectionName)
    .deleteOne({
      _id: new ObjectId(id),
    });

  return result.deletedCount > 0;
}