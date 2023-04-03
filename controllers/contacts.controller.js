const createError = require("../helpers/createError");
const Contact = require("../models/contacts/contacts.model");
const { contactsService } = require("../services/index");

const getListContacts = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 0;
  const favorite = req.query.favorite || null;

  const query = { owner: req.user._id };
  if (favorite !== null) {
    query.favorite = favorite;
  }
  let contacts;
  if (limit > 0) {
    const skipSize = (page - 1) * limit;
    contacts = await Contact.find(query)
      .populate("owner", "-password")
      .skip(skipSize)
      .limit(limit);
  } else {
    contacts = await Contact.find(query).populate("owner", "-password");
  }

  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.findOne(id);

  if (!contact) {
    const error = createError(404, "Not found");
    throw error;
  }
  res.status(200).json(contact);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.remove(id);

  if (!contact) {
    const error = createError(404, "Not found");
    throw error;
  }

  res.status(200).json({ message: "Contact deleted" });
};

const addContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;

  const contacts = await contactsService.create({
    name,
    email,
    phone,
    favorite,
    owner: req.user._id,
  });
  res.status(201).json(contacts);
};

const updateContactById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const contact = await contactsService.update(id, { name, email, phone });
  if (!contact) {
    const error = createError(404, "Not found");
    throw error;
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const contact = await contactsService.updateStatus(id, { favorite });
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
