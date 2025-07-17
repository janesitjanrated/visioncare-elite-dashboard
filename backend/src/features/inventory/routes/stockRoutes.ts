import { Router } from 'express';
import { StockController } from '../controllers/StockController';
import { StockService } from '../services/StockService';
import { StockValidator } from '../validators/StockValidator';
import validate from '../../../middlewares/validate';
import db from '../../../config/db';
import { jwtAuth } from '../../../middlewares/jwtAuth';
import { orgContext } from '../../../middlewares/orgContext';
import { rbacGuard } from '../../../middlewares/rbacGuard';
import { StockModel } from '../models/Stock';

const router = Router();
const stockModel = new StockModel(db);
const stockService = new StockService(stockModel);
const stockController = new StockController(stockService);

// Apply middleware
router.use(jwtAuth);
router.use(orgContext);
router.use(rbacGuard(['admin', 'manager', 'staff']));

// Routes
router.get('/', stockController.getAllStock);
router.get('/low', stockController.getLowStock);
router.get('/branch/:branchId', stockController.getStockByBranch);
router.get('/product/:productId', stockController.getStockByProduct);
router.patch('/:id/adjust', validate(StockValidator.adjust), stockController.adjustStock);

export default router;
