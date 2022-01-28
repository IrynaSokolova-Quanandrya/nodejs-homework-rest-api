const express = require('express')
const createError = require('http-errors')
const Joi = require("joi")

const Contact = require("../../models/contact")

const productSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ 
    minDomainSegments: 2, tlds: { 
      allow: ['com', 'net', 'ua'] 
    } }).required(),
  phone: Joi.number().min(7).required() 
})

const router = express.Router()


router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find()
    res.json(result)
  } catch (error) {
    next(error)
  }
})
 

router.get('/:contactId', async (req, res, next) => {
  try {
     const {contactId} = req.params;
     const result = await Contact.findById(contactId)
     if(!result){
       throw new createError(404, 'Not found')
     }
     res.json(result)
  } catch (error) {
    if(error.message.includes("Cast to ObjectId faild"))
    next(error)
  }
})

router.post('/', async (req, res, next) => {
    try {
      const {error} = productSchema.validate(req.body);
      if(error){
        throw new createError(400, error.message)
      }
      const result = await Contact.create(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
})

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const {contactId} = req.params;
//     const result = await Contact.findOneAndRemove(contactId);
//     if(!result){
//       throw new createError(404, "Not found")
//     }
//     res.json({message: "сontact deleted"})
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = productSchema.validate(req.body);
      if(error){
        throw new createError(400, error.message)
      }
      const {contactId} = req.params;
      // const {name, email, phone } = req.body
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true})
    if(!result){
      throw new createError(404, "Not found")
    }
      res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
