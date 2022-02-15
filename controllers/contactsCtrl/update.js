const CreateError = require('http-errors')
const ObjectId = require("mongoose").Types.ObjectId;

const {Contact, schemas} = require('../../models/contact')

const update = async (req, res, next) => {
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
  }

  module.exports = update;