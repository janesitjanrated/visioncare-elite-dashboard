import Joi from 'joi';

export const prescriptionCreateSchema = Joi.object({
  patient_id: Joi.string().uuid().required(),
  staff_id: Joi.string().uuid().required(),
  type: Joi.string().optional(),
  data: Joi.object().required(),
  date: Joi.date().iso().required(),
  notes: Joi.string().optional(),
});

export const prescriptionUpdateSchema = Joi.object({
  type: Joi.string().optional(),
  data: Joi.object().optional(),
  date: Joi.date().iso().optional(),
  notes: Joi.string().optional(),
}); 