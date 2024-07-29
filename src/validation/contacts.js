import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(10).max(13).required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean(),
  contactType:  Joi.string().valid('work', 'home', 'personal').required().
  messages({
    'string.base': 'Contact Type should be a string',
    'string.valid': 'Contact Type should have at one of work, home or personal',
    'any.required': 'Contact Type is required',
  })
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(10).max(13),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});