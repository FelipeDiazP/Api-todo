import { ObjectId } from "mongodb";

import { BadRequestError, NotFoundError } from "../../shared/errors/AppError";

import { Category, CategoryDTO } from "./category.model";

import { CategoryRepository } from "./category.repository";

export class CategoryService {
  private readonly categoryRepository = new CategoryRepository();

  async create(data: CategoryDTO): Promise<Category> {
    const name = this.requireString(data?.name, "name");

    const description = this.requireString(data?.description, "description");

    const existingCategory = await this.categoryRepository.findByName(name);

    if (existingCategory) {
      throw new BadRequestError("Ya existe una categoría con ese nombre");
    }

    const now = new Date();

    return this.categoryRepository.create({
      name,

      description,

      createdAt: now,

      updatedAt: now,
    });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findById(id: string): Promise<Category> {
    const objectId = this.toObjectId(id);

    const category = await this.categoryRepository.findById(objectId);

    if (!category) {
      throw new NotFoundError("Categoría no encontrada");
    }

    return category;
  }

  async update(id: string, data: CategoryDTO): Promise<Category> {
    const objectId = this.toObjectId(id);

    const changes: Partial<Category> = {};

    if (data.name !== undefined) {
      changes.name = this.requireString(data.name, "name");
    }

    if (data.description !== undefined) {
      changes.description = this.requireString(data.description, "description");
    }

    if (Object.keys(changes).length === 0) {
      throw new BadRequestError("No se enviaron campos para actualizar");
    }

    changes.updatedAt = new Date();

    const updated = await this.categoryRepository.update(objectId, changes);

    if (!updated) {
      throw new NotFoundError("Categoría no encontrada");
    }

    return updated;
  }

  async delete(id: string): Promise<void> {
    const objectId = this.toObjectId(id);

    const deleted = await this.categoryRepository.delete(objectId);

    if (!deleted) {
      throw new NotFoundError("Categoría no encontrada");
    }
  }

  private requireString(value: unknown, field: string): string {
    if (typeof value !== "string" || value.trim() === "") {
      throw new BadRequestError(
        `El campo '${field}' es obligatorio y debe ser un texto no vacío`,
      );
    }

    return value.trim();
  }

  private toObjectId(id: string): ObjectId {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestError(`Identificador inválido: ${id}`);
    }

    return new ObjectId(id);
  }
}
