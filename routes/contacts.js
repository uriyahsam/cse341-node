const router = require('express').Router();
const contactsController = require('../controllers/contacts');

// GET /contacts — returns all contacts
router.get('/', contactsController.getAll);

// GET /contacts/:id — returns a single contact by id
router.get('/:id', contactsController.getSingle);

module.exports = router;
