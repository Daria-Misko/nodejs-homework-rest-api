const { isValidObjectId } = require("mongoose");
const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
	const { contactId } = req.params;
	if (!isValidObjectId(contactId)) {
		next(HttpError(400, `${contactId} is not valid id`));
	}
	next();
};

const contactExists = async (req, res, next) => {
	const { contactId } = req.params;
	const contact = await Contact.findById(contactId);
	if (!contact) {
		next(HttpError(404, "Not found"));
		return;
	}
	next();
};

module.exports = { isValidId, contactExists };
