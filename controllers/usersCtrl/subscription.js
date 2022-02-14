const CreateError = require("http-errors")

const {User, schemas} = require("../../models/user")

const subscription = async (req, res, next) => {
    try {
      const { error } = schemas.update.validate(req.body);
  
      if (error) {
          throw new CreateError(400, error.message)
        };
        const {email, subscription, id} = req.body
      await User.findByIdAndUpdate(
        id,
        email,
        subscription,
        {new: true}
      );
  
      res.json({ 
          email, subscription 
        });
    } catch (error) {
      next(error);
    }
  }

  module.exports = subscription;