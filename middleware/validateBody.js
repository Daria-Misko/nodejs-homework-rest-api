const { HttpError } = require("../helpers/HttpError");

const validateBody = (schema) => {
	const func = (req, res, next) => {
		if (!req.body || Object.keys(req.body).length === 0) {
			throw HttpError(400, "missing fields");
		}
		const { error } = schema.validate(req.body);

		if (error) {
			next(HttpError(400, error.message));
		}
		next();
	};
	return func;
};

const validateFavoriteField = (req, res, next) => {
	if (!req.body || req.body.favorite === undefined) {
		throw HttpError(400, "missing field favorite");
	}
	next();
};

module.exports = { validateBody, validateFavoriteField };
