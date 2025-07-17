import Joi from 'joi';

export const patientCreateSchema = Joi.object({
  org_id: Joi.string().uuid().required(),
  branch_id: Joi.string().uuid().required(),
  name: Joi.string().max(100).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  date_of_birth: Joi.date().iso().optional(),
  gender: Joi.string().optional(),
  status: Joi.string().optional(),
  photo: Joi.string().optional(),
});

export const patientUpdateSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  date_of_birth: Joi.date().iso().optional(),
  gender: Joi.string().optional(),
  status: Joi.string().optional(),
  photo: Joi.string().optional(),
});
