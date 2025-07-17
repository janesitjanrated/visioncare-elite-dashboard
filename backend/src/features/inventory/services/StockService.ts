import { StockModel, Stock } from '../models/Stock';
import { NotFoundError } from '../../../utils/errors';

export class StockService {
  constructor(private readonly stockModel: StockModel) {}

  async getAllStock(organizationId: string) {
    return this.stockModel.findAll(organizationId);
  }

  async getStockByBranch(branchId: string, organizationId: string) {
    return this.stockModel.findByBranch(branchId, organizationId);
  }

  async getStockByProduct(productId: string, organizationId: string) {
    return this.stockModel.findByProduct(productId, organizationId);
  }

  async adjustStock(id: string, quantity: number, organizationId: string) {
    const updated = await this.stockModel.adjustStock(id, quantity, organizationId);
    if (!updated) {
      throw new NotFoundError('Stock not found');
    }
    return updated;
  }

  async getLowStock(organizationId: string) {
    return this.stockModel.getLowStock(organizationId);
  }
}
