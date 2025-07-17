import { Knex } from 'knex';
import { ValidationError, NotFoundError } from '../../../utils/errors';
import { Post, Comment, Reaction } from '../models/Community';

export class CommunityService {
  constructor(private readonly db: Knex) {}

  // Posts
  async getAllPosts(
    organizationId: string,
    page: number = 1,
    limit: number = 10,
    category?: string
  ) {
    let query = this.db('posts')
      .where('organization_id', organizationId)
      .orderBy('created_at', 'desc');

    if (category) {
      query = query.where('category', category);
    }

    const offset = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      query.clone().offset(offset).limit(limit),
      query.clone().count('* as count').first()
    ]);

    return {
      data: posts,
      pagination: {
        page,
        limit,
        total: total ? Number(total.count) : 0,
        totalPages: total ? Math.ceil(Number(total.count) / limit) : 0
      }
    };
  }

  async getPostById(id: string, organizationId: string) {
    const post = await this.db('posts')
      .where({ id, organization_id: organizationId })
      .first();

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    // Get comments count
    const commentsCount = await this.db('comments')
      .where('post_id', id)
      .count('* as count')
      .first();

    // Get reactions count
    const reactionsCount = await this.db('reactions')
      .where('post_id', id)
      .count('* as count')
      .first();

    return {
      ...post,
      commentsCount: Number(commentsCount?.count || 0),
      reactionsCount: Number(reactionsCount?.count || 0)
    };
  }

  async createPost(data: Partial<Post>) {
    const [post] = await this.db('posts')
      .insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    return post;
  }

  async updatePost(id: string, organizationId: string, data: Partial<Post>) {
    const [updated] = await this.db('posts')
      .where({ id, organization_id: organizationId })
      .update({
        ...data,
        updated_at: new Date()
      })
      .returning('*');

    if (!updated) {
      throw new NotFoundError('Post not found');
    }

    return updated;
  }

  async deletePost(id: string, organizationId: string) {
    // Delete associated comments and reactions first
    await Promise.all([
      this.db('comments').where('post_id', id).delete(),
      this.db('reactions').where('post_id', id).delete()
    ]);

    const deleted = await this.db('posts')
      .where({ id, organization_id: organizationId })
      .delete();

    if (!deleted) {
      throw new NotFoundError('Post not found');
    }
  }

  // Comments
  async getComments(postId: string, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const [comments, total] = await Promise.all([
      this.db('comments')
        .where('post_id', postId)
        .orderBy('created_at', 'desc')
        .offset(offset)
        .limit(limit),
      this.db('comments')
        .where('post_id', postId)
        .count('* as count')
        .first()
    ]);

    return {
      data: comments,
      pagination: {
        page,
        limit,
        total: total ? Number(total.count) : 0,
        totalPages: total ? Math.ceil(Number(total.count) / limit) : 0
      }
    };
  }

  async createComment(data: Partial<Comment>) {
    const [comment] = await this.db('comments')
      .insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    return comment;
  }

  async updateComment(id: string, organizationId: string, data: Partial<Comment>) {
    const [updated] = await this.db('comments')
      .where({ id, organization_id: organizationId })
      .update({
        ...data,
        updated_at: new Date()
      })
      .returning('*');

    if (!updated) {
      throw new NotFoundError('Comment not found');
    }

    return updated;
  }

  async deleteComment(id: string, organizationId: string) {
    const deleted = await this.db('comments')
      .where({ id, organization_id: organizationId })
      .delete();

    if (!deleted) {
      throw new NotFoundError('Comment not found');
    }
  }

  // Reactions
  async addReaction(data: Partial<Reaction>) {
    // Check if reaction already exists
    const existing = await this.db('reactions')
      .where({
        post_id: data.postId,
        user_id: data.userId
      })
      .first();

    if (existing) {
      // Update existing reaction if type is different
      if (existing.type !== data.type) {
        const [updated] = await this.db('reactions')
          .where({ id: existing.id })
          .update({
            type: data.type,
            updated_at: new Date()
          })
          .returning('*');
        return updated;
      }
      return existing;
    }

    // Create new reaction
    const [reaction] = await this.db('reactions')
      .insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    return reaction;
  }

  async removeReaction(postId: string, userId: string) {
    await this.db('reactions')
      .where({
        post_id: postId,
        user_id: userId
      })
      .delete();
  }

  // Categories
  async getCategories(organizationId: string) {
    return await this.db('post_categories')
      .where('organization_id', organizationId)
      .orderBy('name', 'asc');
  }
}
