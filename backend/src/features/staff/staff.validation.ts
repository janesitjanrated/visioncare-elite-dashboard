import Joi from 'joi';

export const staffCreateSchema = Joi.object({
  org_id: Joi.string().uuid().required(),
  branch_id: Joi.string().uuid().required(),
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  role: Joi.string().max(30).required(),
  password: Joi.string().min(8).required(),
  avatar: Joi.string().optional(),
});

export const staffUpdateSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().max(30).optional(),
  password: Joi.string().min(8).optional(),
  avatar: Joi.string().optional(),
}); 