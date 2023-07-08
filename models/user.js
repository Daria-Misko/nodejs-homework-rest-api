const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers/handleMongooseError");

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: "",
		},
		avatarURL: {
			type: String,
			required: true,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().required(),
});

const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verifyEmailSchema = Joi.object({
	email: Joi.string()
		.messages({ "any.required": `missing required field email` })
		.required(),
});

const schemas = {
	registerSchema,
	loginSchema,
	updateSubscriptionSchema,
	verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
