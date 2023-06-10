const path = require("path");
const { nanoid } = require("nanoid");
const { readFile, writeFile } = require("fs").promises;

const contactsPath = path.join(__dirname, "../models/contacts.json");

async function listContacts() {
	const data = await readFile(contactsPath, "utf-8");
	const result = JSON.parse(data);
	return result;
}

async function getContactById(contactId) {
	const allContacts = await listContacts();
	const result = allContacts.find((contact) => contact.id === contactId);
	return result || null;
}

async function removeContact(contactId) {
	const allContacts = await listContacts();
	const index = allContacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = allContacts.splice(index, 1);
	await writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return result;
}

async function addContact({ name, email, phone }) {
	const allContacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	allContacts.push(newContact);
	await writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return newContact;
}

const updateContact = async (contactId, body) => {
	const allContacts = await listContacts();
	const index = allContacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	allContacts[index] = { id: contactId, ...body };
	await writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return allContacts[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
