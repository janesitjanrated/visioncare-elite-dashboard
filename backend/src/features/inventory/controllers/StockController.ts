import { Request, Response } from 'express';
import { StockService } from '../services/StockService';
import { ValidationError } from '../../../utils/errors';

export class StockController {
  constructor(private readonly stockService: StockService) {}

  getAllStock = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const stock = await this.stockService.getAllStock(req.org_id);
    res.json({ success: true, data: stock });
  };

  getStockByBranch = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { branchId } = req.params;
    const stock = await this.stockService.getStockByBranch(branchId, req.org_id);
    res.json({ success: true, data: stock });
  };

  getStockByProduct = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { productId } = req.params;
    const stock = await this.stockService.getStockByProduct(productId, req.org_id);
    res.json({ success: true, data: stock });
  };

  adjustStock = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const { quantity } = req.body;
    const stock = await this.stockService.adjustStock(id, quantity, req.org_id);
    res.json({ success: true, data: stock });
  };

  getLowStock = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const stock = await this.stockService.getLowStock(req.org_id);
    res.json({ success: true, data: stock });
  };
}
