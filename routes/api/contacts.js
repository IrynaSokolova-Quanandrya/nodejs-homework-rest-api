const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const contacts = require("../../models/contacts")

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})
 

router.get('/:contactId', async (req, res, next) => {
  try {
     const {id} = req.params;
     const result = await contacts.getContactById(id)
     if(!result){
       throw new createError(404, 'Not found')
     }
     res.json(result)
  } catch (error) {
    next(error)
  }
 
 
})

router.post('/', async (req, res, next) => {
    try {
      const {name, email, phone } = req.body
      const result = await contacts.addContact(name, email, phone)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }


  await contacts.addContact()
  console.log(req.body);
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  // await contacts.removeContact()
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  // await contacts.updateContact( )
  res.json({ message: 'template message' })
})

module.exports = router
