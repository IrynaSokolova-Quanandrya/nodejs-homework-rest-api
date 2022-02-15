const CreateError = require('http-errors')
const ObjectId = require("mongoose").Types.ObjectId;

const {Contact} = require('../../models/contact')



const deleteById = async (req, res, next) => {
    try {
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
  }

  module.exports = deleteById;