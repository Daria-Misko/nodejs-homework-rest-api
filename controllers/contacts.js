const { HttpError } = require("../helpers/HttpError");
const { Contact } = require("../models/contact");

const listContacts = async (req, res, next) => {
	try {
		const { _id: owner } = req.user;

		const { page = 1, limit = 20 } = req.query;
		const skip = (page - 1) * limit;

		const result = await Contact.find({ owner, favorite: true }, "", {
			skip,
			limit,
		}).populate("owner", "email");
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const getContactById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await Contact.findById(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const addContact = async (req, res, next) => {
	try {
		const { _id: owner } = req.user;
		const result = await Contact.create({ ...req.body, owner });
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const removeContact = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await Contact.findByIdAndRemove(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json({
			message: "contact deleted",
		});
	} catch (error) {
		next(error);
	}
};

const updateContact = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await Contact.findByIdAndUpdate(contactId, req.body, {
			new: true,
		});
		if (!result) {
			throw HttpError(404, "Not found");
		}
		return res.json(result);
	} catch (error) {
		next(error);
	}
};

const updateFavorite = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await Contact.findByIdAndUpdate(contactId, req.body, {
			new: true,
		});
		if (!result) {
			throw HttpError(404, "Not found");
		}
		return res.json(result);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateFavorite,
};
