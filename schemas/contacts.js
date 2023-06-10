const Joi = require("joi");

const addSchema = Joi.object({
	name: Joi.string().min(3).max(30).required().messages({
		"any.required": `missing required name field`,
		"string.min": `name should have a minimum length of {#limit}`,
		"string.max": `name should have a maximum length of {#limit}`,
	}),
	email: Joi.string()
		.email()
		.required()
		.messages({ "any.required": `missing required email field` }),
	phone: Joi.string()
		.required()
		.messages({ "any.required": `missing required phone field` }),
});

module.exports = addSchema;
