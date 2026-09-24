import { ObjectId } from "mongodb";

export interface Statistics {
  _id?: ObjectId;

  name: string;

  total: number;

  completed: number;

  pending: number;

  completionPercentage: number;

  createdAt: Date;

  updatedAt: Date;
}