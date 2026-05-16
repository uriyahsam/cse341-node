const router = require('express').Router();
const contactsController = require('../controllers/contacts');

// GET /contacts — returns all contacts
router.get('/', contactsController.getAll);

// GET /contacts/:id — returns a single contact by MongoDB _id
router.get('/:id', contactsController.getSingle);

// POST /contacts — create a new contact
router.post('/', contactsController.createContact);

// PUT /contacts/:id — update a contact by id
router.put('/:id', contactsController.updateContact);

// DELETE /contacts/:id — delete a contact by id
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
