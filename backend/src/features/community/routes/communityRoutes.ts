import { Router } from 'express';
import { CommunityController } from '../controllers/CommunityController';
import { CommunityService } from '../services/CommunityService';
import { CommunityModel } from '../models/Community';
import validate from '../../../middlewares/validate';
import { CommunityValidator } from '../validators/CommunityValidator';
import db from '../../../config/db';
import { jwtAuth } from '../../../middlewares/jwtAuth';
import { orgContext } from '../../../middlewares/orgContext';
import { rbacGuard } from '../../../middlewares/rbacGuard';

const router = Router();
const communityModel = new CommunityModel(db);
const communityService = new CommunityService(db);
const communityController = new CommunityController(communityService);

// Apply middleware
router.use(jwtAuth);
router.use(orgContext);
router.use(rbacGuard(['admin', 'manager', 'staff']));

// Post Routes
router.get('/posts', communityController.getAllPosts);
router.get('/posts/:id', communityController.getPostById);
router.post('/posts', validate(CommunityValidator.createPost), communityController.createPost);
router.put('/posts/:id', validate(CommunityValidator.updatePost), communityController.updatePost);
router.delete('/posts/:id', communityController.deletePost);

// Comment Routes
router.get('/posts/:postId/comments', communityController.getComments);
router.post('/posts/:postId/comments', validate(CommunityValidator.createComment), communityController.createComment);
router.put('/comments/:id', validate(CommunityValidator.updateComment), communityController.updateComment);
router.delete('/comments/:id', communityController.deleteComment);

// Reaction Routes
router.post('/posts/:postId/reactions', validate(CommunityValidator.addReaction), communityController.addReaction);
router.delete('/posts/:postId/reactions', communityController.removeReaction);

// Category Routes
router.get('/categories', communityController.getCategories);

export default router;
