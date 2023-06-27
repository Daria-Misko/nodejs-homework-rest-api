const express = require("express");

const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateFavorite,
} = require("../../controllers/contacts");

const {
	validateBody,
	validateFavoriteField,
} = require("../../middleware/validateBody");

const { schemas } = require("../../models/contact");
const { isValidId, contactExists } = require("../../middleware/isValidId");
const { authenticate } = require("../../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, listContacts);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), addContact);

router.patch(
	"/:contactId/favorite",
	authenticate,
	isValidId,
	contactExists,
	validateFavoriteField,
	validateBody(schemas.updateFavoriteSchema),
	updateFavorite
);

router.delete(
	"/:contactId",
	authenticate,
	isValidId,
	contactExists,
	removeContact
);

router.put(
	"/:contactId",
	authenticate,
	isValidId,
	contactExists,
	validateBody(schemas.addSchema),
	updateContact
);

module.exports = router;
