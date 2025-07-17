import Joi from 'joi';

export const branchCreateSchema = Joi.object({
  org_id: Joi.string().uuid().required(),
  name: Joi.string().max(100).required(),
  address: Joi.string().optional(),
  status: Joi.string().optional(),
  coordinates: Joi.object().optional(),
});

export const branchUpdateSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  address: Joi.string().optional(),
  status: Joi.string().optional(),
  coordinates: Joi.object().optional(),
}); 