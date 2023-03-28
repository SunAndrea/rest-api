const createError = require("../helpers/createError");

const contactsServices = require("../services/contacts.services");

const getListContacts = async (req, res, next) => {
  const contacts = await contactsServices.findAll();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsServices.findOne(id);

  if (!contact) {
    const error = createError(404, "Not found");
    throw error;
  }
  res.status(200).json(contact);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsServices.remove(id);

  if (!contact) {
    const error = createError(404, "Not found");
    throw error;
  }

  res.status(200).json({ message: "Contact deleted" });
};

const addContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;

  const contacts = await contactsServices.create({
    name,
    email,
    phone,
    favorite,
  });
  res.status(201).json(contacts);
};

const updateContactById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const contact = await contactsServices.update(id, { name, email, phone });
  if (!contact) {
    const error = createError(404, "Not found");
    throw error;
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const contact = await contactsServices.updateStatus(id, { favorite });
  if (!contact) {
    const error = createError(404, "Not found");
    throw error;
  }
  res.status(200).json(contact);
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
