const express = require('express')
const CreateError = require('http-errors')
const ObjectId = require("mongoose").Types.ObjectId;

const {Contact, schemas} = require('../../models/contact')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
    const{_id} = req.user
    
    const {page = 1, limit = 20} = req.query;
    if(isNaN(page) || isNaN(limit)){
      throw new CreateError(400, "Page and limits not a number")
    }
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
     if(!ObjectId.isValid(contactId)){
      throw new CreateError(404, "Id not valid")
    }
     const result = await Contact.findById({
      _id: ObjectId(contactId),
      owner: req.user.id
     })
     if(!result){
       throw new CreateError(404, 'Not found')
     }
     res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
    try {
      const {error} = schemas.add.validate(req.body);
      if(error){
        throw new CreateError(400, error.message)
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
    console.log(req.params);
    const {contactId} = req.params;
    if(!ObjectId.isValid(contactId)){
      throw new CreateError(404, "Id not valid")
    }
    const result = await Contact.findByIdAndDelete({
      _id: ObjectId(contactId),
      owner: req.user.id
    });
    if(!result){
      throw new CreateError(404, "Not found")
    }
    res.json({message: "сontact deleted"})
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = schemas.add.validate(req.body);
      if(error){
        throw new CreateError(400, error.message)
      }
      const {contactId} = req.params;
      if(!ObjectId.isValid(contactId)){
        throw new CreateError(404, "Id not valid")
      }
      const result = await Contact.findByIdAndUpdate(
        {
          _id: ObjectId(contactId), 
          owner: req.user.id
        },  
        req.body, 
        {new:true}
        )
    if(!result){
      throw new CreateError(404, "Not found")
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
        throw new CreateError(400, "missing field favorite")
      }
      const {contactId} = req.params;
      if(!ObjectId.isValid(contactId)){
        throw new CreateError(404, "Id not valid")
      }
      const result = await Contact.findByIdAndUpdate({
        _id: ObjectId(contactId),
        owner: req.user.id
       },
        req.body,
        { new: true }
        )
    if(!result){
      throw new CreateError(404, "Not found")
    }
      res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
