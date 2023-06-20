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

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(schemas.addSchema), addContact);

router.patch(
	"/:contactId/favorite",
	isValidId,
	contactExists,
	validateFavoriteField,
	validateBody(schemas.updateFavoriteSchema),
	updateFavorite
);

router.delete("/:contactId", isValidId, contactExists, removeContact);

router.put(
	"/:contactId",
	isValidId,
	contactExists,
	validateBody(schemas.addSchema),
	updateContact
);

module.exports = router;
