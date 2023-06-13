const express = require("express");

const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
} = require("../../controllers/contacts");
const validateBody = require("../../middleware");

const addSchema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(addSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateBody(addSchema), updateContact);

module.exports = router;
