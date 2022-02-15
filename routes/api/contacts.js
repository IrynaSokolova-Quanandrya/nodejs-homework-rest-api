const express = require('express')

const ctrl = require("../../controllers/contactsCtrl")

const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', ctrl.create)

router.delete('/:contactId', ctrl.deleteById)

router.put('/:contactId', ctrl.update)

router.patch('/:contactId/favorite', ctrl.updateOne)

module.exports = router;
