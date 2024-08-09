import { Contact } from '../models/contacts.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ 
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = Contact.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  contactsQuery.where('userId').equals(userId);

  const [contactsCount, contacts] = await Promise.all([
    Contact.find({ userId }).merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);
  
  return {
    data: contacts,
    ...paginationData,
    };
  };

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({_id: contactId, userId});
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

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({_id: contactId, userId });
  return contact;
};