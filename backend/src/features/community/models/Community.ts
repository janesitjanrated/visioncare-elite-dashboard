import { Knex } from 'knex';

export interface Post {
  id: string;
  organizationId: string;
  authorId: string;
  title: string;
  content: string;
  category?: string;
  imageUrl?: string;
  tags?: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  organizationId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reaction {
  id: string;
  postId: string;
  organizationId: string;
  userId: string;
  type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  createdAt: Date;
  updatedAt: Date;
}

export interface PostCategory {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CommunityModel {
  constructor(private readonly db: Knex) {}

  // Helper methods for complex queries if needed
  async searchPosts(query: string, organizationId: string) {
    return await this.db('posts')
      .where('organization_id', organizationId)
      .whereRaw('LOWER(title) LIKE ?', [`%${query.toLowerCase()}%`])
      .orWhereRaw('LOWER(content) LIKE ?', [`%${query.toLowerCase()}%`])
      .orderBy('created_at', 'desc');
  }

  async getTrendingPosts(organizationId: string, limit: number = 5) {
    return await this.db('posts')
      .where('organization_id', organizationId)
      .leftJoin('reactions', 'posts.id', 'reactions.post_id')
      .leftJoin('comments', 'posts.id', 'comments.post_id')
      .groupBy('posts.id')
      .orderByRaw('COUNT(DISTINCT reactions.id) + COUNT(DISTINCT comments.id) DESC')
      .limit(limit)
      .select('posts.*');
  }
}
