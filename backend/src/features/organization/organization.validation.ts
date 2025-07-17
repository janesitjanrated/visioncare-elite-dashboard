import Joi from 'joi';

export const organizationCreateSchema = Joi.object({
  name: Joi.string().max(100).required(),
  status: Joi.string().optional(),
});

export const organizationUpdateSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  status: Joi.string().optional(),
}); 