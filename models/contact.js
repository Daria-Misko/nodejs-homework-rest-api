const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers/handleMongooseError");

const phoneFormat = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
			match: phoneFormat,
			// строка в певному форматі
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

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
		.pattern(phoneFormat)
		.messages({ "any.required": `missing required phone field` }),
	favorite: Joi.boolean().messages({
		"any.required": `missing field favorite`,
	}),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required().messages({
		"any.required": `missing field favorite`,
	}),
});

const schemas = {
	addSchema,
	updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
