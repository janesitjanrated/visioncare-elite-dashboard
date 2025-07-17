import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { ValidationError } from '../../../utils/errors';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  getAllProducts = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const products = await this.productService.getAllProducts(req.org_id);
    res.json({ success: true, data: products });
  };

  getProductById = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const product = await this.productService.getProductById(id, req.org_id);
    res.json({ success: true, data: product });
  };

  createProduct = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const product = await this.productService.createProduct({
      ...req.body,
      organizationId: req.org_id
    });
    res.status(201).json({ success: true, data: product });
  };

  updateProduct = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const product = await this.productService.updateProduct(id, req.org_id, req.body);
    res.json({ success: true, data: product });
  };

  deleteProduct = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    await this.productService.deleteProduct(id, req.org_id);
    res.status(204).send();
  };
}
