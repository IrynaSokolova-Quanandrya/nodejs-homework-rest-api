const CreateError = require('http-errors')

const {Contact} = require('../../models/contact')

const getAll = async (req, res, next) => {
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
}

module.exports = getAll;