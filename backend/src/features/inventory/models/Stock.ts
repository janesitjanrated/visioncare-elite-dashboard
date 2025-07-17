import { Knex } from 'knex';

export interface Stock {
  id: string;
  productId: string;
  branchId: string;
  quantity: number;
  locationId: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
}

export class StockModel {
  constructor(private readonly knex: Knex) {}

  async findAll(organizationId: string) {
    return this.knex('stocks')
      .where({ organizationId })
      .select('*');
  }

  async findByBranch(branchId: string, organizationId: string) {
    return this.knex('stocks')
      .where({ branchId, organizationId })
      .select('*');
  }

  async findByProduct(productId: string, organizationId: string) {
    return this.knex('stocks')
      .where({ productId, organizationId })
      .select('*');
  }

  async adjustStock(id: string, quantity: number, organizationId: string) {
    const [updated] = await this.knex('stocks')
      .where({ id, organizationId })
      .update({
        quantity,
        updatedAt: new Date()
      })
      .returning('*');
    return updated;
  }

  async getLowStock(organizationId: string) {
    return this.knex('stocks')
      .join('products', 'stocks.productId', 'products.id')
      .where('stocks.organizationId', organizationId)
      .whereRaw('stocks.quantity <= products.reorderPoint')
      .select('stocks.*', 'products.name', 'products.reorderPoint');
  }
}
