import { ObjectId } from "mongodb";

export interface Category {
  _id?: ObjectId;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryDTO {
  name?: string;
  description?: string;
}