const express = require('express')
const createError = require('http-errors')
const mongoose = require('mongoose')

const {Contact, schemas} = require('../../models/contact')
const{authentication} = require('../../middlewares')
const router = express.Router()


router.get('/', authentication, async (req, res, next) => {
  try {
    const {page = 1, limit = 20} = req.query;
    const{_id} = req.user
    const skip = (page - 1) * limit;
    const result = await Contact.find(
      {owner: _id}, 
      "-createdAt -updatedAt",
      {skip, limit: +limit}
      ).populate("owner", "email")
    res.json(result)
  } catch (error) {
    next(error)
  }
})
 

router.get('/:contactId', async (req, res, next) => {
  try {
     const {contactId} = req.params;
     if(!mongoose.Types.ObjectId.isValid(contactId)){
      throw new createError(404, "Id not valid")
    }
     const result = await Contact.findById(contactId)
     if(!result){
       throw new createError(404, 'Not found')
     }
     res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', authentication, async (req, res, next) => {
    try {
      const {error} = schemas.contact.validate(req.body);
      if(error){
        throw new createError(400, error.message)
      }
      const data = {...req.body, owner:req.user._id}
      const result = await Contact.create(data)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(contactId)){
      throw new createError(404, "Id not valid")
    }
    const result = await Contact.findByIdAndDelete(contactId);
    if(!result){
      throw new createError(404, "Not found")
    }
    res.json({message: "сontact deleted"})
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = schemas.contact.validate(req.body);
      if(error){
        throw new createError(400, error.message)
      }
      const {contactId} = req.params;
      if(!mongoose.Types.ObjectId.isValid(contactId)){
        throw new createError(404, "Id not valid")
      }
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true})
    if(!result){
      throw new createError(404, "Not found")
    }
      res.json(result)
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const {error} = schemas.favorite.validate(req.body);
      if(error){
        throw new createError(400, "missing field favorite")
      }
      const {contactId} = req.params;
      if(!mongoose.Types.ObjectId.isValid(contactId)){
        throw new createError(404, "Id not valid")
      }
      const result = await Contact.findByIdAndUpdate(contactId, req.body)
    if(!result){
      throw new createError(404, "Not found")
    }
      res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
