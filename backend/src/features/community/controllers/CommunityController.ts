import { Request, Response } from 'express';
import { CommunityService } from '../services/CommunityService';
import { ValidationError } from '../../../utils/errors';

export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // Posts
  getAllPosts = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { page, limit, category } = req.query as {
      page?: string;
      limit?: string;
      category?: string;
    };

    const posts = await this.communityService.getAllPosts(
      req.org_id,
      Number(page) || 1,
      Number(limit) || 10,
      category
    );
    res.json({ success: true, data: posts });
  };

  getPostById = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const post = await this.communityService.getPostById(id, req.org_id);
    res.json({ success: true, data: post });
  };

  createPost = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const userId = req.user?.id;
    if (!userId) {
      throw new ValidationError('User ID is required');
    }
    const post = await this.communityService.createPost({
      ...req.body,
      organizationId: req.org_id,
      authorId: userId
    });
    res.status(201).json({ success: true, data: post });
  };

  updatePost = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const post = await this.communityService.updatePost(id, req.org_id, req.body);
    res.json({ success: true, data: post });
  };

  deletePost = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    await this.communityService.deletePost(id, req.org_id);
    res.status(204).send();
  };

  // Comments
  getComments = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { postId } = req.params;
    const { page, limit } = req.query as {
      page?: string;
      limit?: string;
    };

    const comments = await this.communityService.getComments(
      postId,
      Number(page) || 1,
      Number(limit) || 10
    );
    res.json({ success: true, data: comments });
  };

  createComment = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { postId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      throw new ValidationError('User ID is required');
    }
    const comment = await this.communityService.createComment({
      ...req.body,
      postId,
      organizationId: req.org_id,
      authorId: userId
    });
    res.status(201).json({ success: true, data: comment });
  };

  updateComment = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const comment = await this.communityService.updateComment(id, req.org_id, req.body);
    res.json({ success: true, data: comment });
  };

  deleteComment = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    await this.communityService.deleteComment(id, req.org_id);
    res.status(204).send();
  };

  // Reactions
  addReaction = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { postId } = req.params;
    const { type } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      throw new ValidationError('User ID is required');
    }
    const reaction = await this.communityService.addReaction({
      postId,
      organizationId: req.org_id,
      userId,
      type
    });
    res.status(201).json({ success: true, data: reaction });
  };

  removeReaction = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { postId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      throw new ValidationError('User ID is required');
    }
    await this.communityService.removeReaction(postId, userId);
    res.status(204).send();
  };

  // Categories
  getCategories = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const categories = await this.communityService.getCategories(req.org_id);
    res.json({ success: true, data: categories });
  };
}
