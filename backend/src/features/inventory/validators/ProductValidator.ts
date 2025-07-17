import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  sku: z.string().min(1),
  category: z.string().min(1),
  manufacturer: z.string().optional(),
  reorderPoint: z.number().min(0).optional(),
  reorderQuantity: z.number().min(0).optional()
});

export const updateProductSchema = createProductSchema.partial();

export class ProductValidator {
  static create = createProductSchema;
  static update = updateProductSchema;
}
