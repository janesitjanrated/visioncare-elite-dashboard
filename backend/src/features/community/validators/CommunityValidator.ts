import { z } from 'zod';

export const CommunityValidator = {
  // Post Validation
  createPost: z.object({
    title: z.string().min(1, 'Title is required').max(200),
    content: z.string().min(1, 'Content is required'),
    category: z.string().optional(),
    imageUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().default(true)
  }),

  updatePost: z.object({
    title: z.string().min(1, 'Title is required').max(200).optional(),
    content: z.string().min(1, 'Content is required').optional(),
    category: z.string().optional(),
    imageUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().optional()
  }),

  // Comment Validation
  createComment: z.object({
    content: z.string().min(1, 'Comment content is required').max(1000)
  }),

  updateComment: z.object({
    content: z.string().min(1, 'Comment content is required').max(1000)
  }),

  // Reaction Validation
  addReaction: z.object({
    type: z.enum(['like', 'love', 'haha', 'wow', 'sad', 'angry'])
  })
};
