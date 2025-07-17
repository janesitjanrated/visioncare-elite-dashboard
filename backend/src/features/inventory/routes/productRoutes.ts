import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { ProductService } from '../services/ProductService';
import { ProductValidator } from '../validators/ProductValidator';
import validate from '../../../middlewares/validate';
import db from '../../../config/db';
import { jwtAuth } from '../../../middlewares/jwtAuth';
import { orgContext } from '../../../middlewares/orgContext';
import { rbacGuard } from '../../../middlewares/rbacGuard';
import { ProductModel } from '../models/Product';

const router = Router();
const productModel = new ProductModel(db);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

// Apply middleware
router.use(jwtAuth);
router.use(orgContext);
router.use(rbacGuard(['admin', 'manager', 'staff']));

// Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validate(ProductValidator.create), productController.createProduct);
router.put('/:id', validate(ProductValidator.update), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
