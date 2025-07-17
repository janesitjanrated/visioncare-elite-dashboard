import { z } from 'zod';

export const adjustStockSchema = z.object({
  quantity: z.number(),
  reason: z.string().optional()
});

export class StockValidator {
  static adjust = adjustStockSchema;
}
