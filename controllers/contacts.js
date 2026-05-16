const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET /contacts — returns all contacts
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const contacts = await db.collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /contacts/:id — returns a single contact by id
const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }
    const db = mongodb.getDb().db();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /contacts — create a new contact (all fields required)
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday.'
      });
    }

    const newContact = { firstName, lastName, email, favoriteColor, birthday };
    const db = mongodb.getDb().db();
    const result = await db.collection('contacts').insertOne(newContact);

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /contacts/:id — update a contact (all fields required)
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday.'
      });
    }

    const updatedContact = { firstName, lastName, email, favoriteColor, birthday };
    const db = mongodb.getDb().db();
    const result = await db
      .collection('contacts')
      .replaceOne({ _id: new ObjectId(id) }, updatedContact);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /contacts/:id — delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    const db = mongodb.getDb().db();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
