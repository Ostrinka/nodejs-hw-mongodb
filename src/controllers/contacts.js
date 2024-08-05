import createHttpError from 'http-errors';
import { getAllContacts, getContactById, createContact, patchContact, deleteContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder, filter, userId: req.user._id });
  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);

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
    userId: req.user._id,
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
    userId: req.user._id,
  };
  const result = await patchContact(contactId, contact);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.send({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).end();
};