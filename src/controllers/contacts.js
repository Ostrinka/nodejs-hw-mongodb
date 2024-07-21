import createHttpError from 'http-errors';
import { getAllContacts, getContactById, createContact, patchContact, deleteContact } from '../services/contacts.js';

export const getStudentsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
};

export const getStudentByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
    next(createHttpError(404, 'Contact not found'));
  }
    res.send({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    }); 
};

export const createContactController = async (req, res) => {
  const contact = await createContact({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    });

  res.status(201).send({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  const result = await patchContact(contactId, contact);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.send({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).end();
};