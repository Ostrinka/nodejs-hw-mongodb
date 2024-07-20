import { Contact } from '../models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (contact) => {
  const newContact = await Contact.create(contact);
  return newContact;
};

export const patchContact = async (contactId, contact) => {
  const result = await Contact.findByIdAndUpdate(contactId, contact,{new:true});
  return result;
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
};