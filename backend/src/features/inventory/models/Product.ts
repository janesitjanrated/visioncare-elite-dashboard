import { Knex } from 'knex';

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  categoryId: string;
  unit: string;
  minStockLevel: number;
  maxStockLevel: number;
  reorderPoint: number;
  costPrice: number;
  sellingPrice: number;
  barcode?: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
}

export class ProductModel {
  constructor(private readonly knex: Knex) {}

  async findAll(organizationId: string) {
    return this.knex('products')
      .where({ organizationId })
      .select('*');
  }

  async findById(id: string, organizationId: string) {
    return this.knex('products')
      .where({ id, organizationId })
      .first();
  }

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const [created] = await this.knex('products')
      .insert({
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning('*');
    return created;
  }

  async update(id: string, organizationId: string, product: Partial<Product>) {
    const [updated] = await this.knex('products')
      .where({ id, organizationId })
      .update({
        ...product,
        updatedAt: new Date()
      })
      .returning('*');
    return updated;
  }

  async delete(id: string, organizationId: string) {
    return this.knex('products')
      .where({ id, organizationId })
      .delete();
  }
}
