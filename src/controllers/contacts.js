import { Contact } from '../models/contacts.js';

export const getStudentsController = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getStudentByIdController = async (req, res) => {
  try {
    const { contactId } = req.params;
    const user = await Contact.findById(contactId);

    if (user === null) {
      return res.status(404).json({ status: 404, message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};