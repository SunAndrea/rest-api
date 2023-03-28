const createError = require("../helpers/createError");
const Contact = require("../models/contacts/contacts.model");

const findAll = async () => {
  return await Contact.find();
};

const findOne = async (id) => {
  const contact = await Contact.findById(id);

  return contact;
};

const create = async (contact) => {
  return await Contact.create(contact);
};

const update = async (id, contact) => {
  return await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
};

const updateStatus = async (id, contact) => {
  return await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
};

const remove = async (id, contact) => {
  const removedContact = await Contact.findByIdAndRemove(id, contact, {
    new: true,
  });

  if (!removedContact) {
    throw createError(404, `contact not found`);
  }

  return removedContact;
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  updateStatus,
  remove,
};
