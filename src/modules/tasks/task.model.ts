import { ObjectId } from "mongodb";

export interface Task {
  _id?: ObjectId;
  title: string;
  description: string;
  isDone: boolean;
  categoryId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskDTO {
  title?: string;
  description?: string;
  isDone?: boolean;
  categoryId: string;
}
