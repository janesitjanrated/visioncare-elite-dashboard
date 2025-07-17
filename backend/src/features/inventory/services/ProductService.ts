import { ProductModel, Product } from '../models/Product';
import { NotFoundError } from '../../../utils/errors';

export class ProductService {
  constructor(private readonly productModel: ProductModel) {}

  async getAllProducts(organizationId: string) {
    return this.productModel.findAll(organizationId);
  }

  async getProductById(id: string, organizationId: string) {
    const product = await this.productModel.findById(id, organizationId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.productModel.create(product);
  }

  async updateProduct(id: string, organizationId: string, product: Partial<Product>) {
    const updated = await this.productModel.update(id, organizationId, product);
    if (!updated) {
      throw new NotFoundError('Product not found');
    }
    return updated;
  }

  async deleteProduct(id: string, organizationId: string) {
    const result = await this.productModel.delete(id, organizationId);
    if (!result) {
      throw new NotFoundError('Product not found');
    }
    return result;
  }
}
