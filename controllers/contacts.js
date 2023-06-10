const contacts = require("../models/contacts");

const { HttpError } = require("../helpers/index");

const listContacts = async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const getContactById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contacts.getContactById(contactId);
		if (!result) {
			next(HttpError(404, "Not found"));
			return;
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const addContact = async (req, res, next) => {
	try {
		const result = await contacts.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const removeContact = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contacts.removeContact(contactId);
		if (!result) {
			next(HttpError(404, "Not found"));
			return;
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
		const result = await contacts.updateContact(contactId, req.body);
		if (!result) {
			next(HttpError(404, "Not found"));
			return;
		}
		res.json(result);
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
};
