import Joi from 'joi';

export const appointmentCreateSchema = Joi.object({
  patient_id: Joi.string().uuid().required(),
  staff_id: Joi.string().uuid().required(),
  branch_id: Joi.string().uuid().required(),
  type: Joi.string().optional(),
  date: Joi.date().iso().required(),
  status: Joi.string().optional(),
  notes: Joi.string().optional(),
});

export const appointmentUpdateSchema = Joi.object({
  type: Joi.string().optional(),
  date: Joi.date().iso().optional(),
  status: Joi.string().optional(),
  notes: Joi.string().optional(),
}); 