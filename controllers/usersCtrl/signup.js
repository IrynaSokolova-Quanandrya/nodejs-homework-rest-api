const CreateError = require("http-errors")
const bcrypt = require("bcryptjs")
const gravatar = require("gravatar")
const {User, schemas} = require("../../models/user")

const signup = async(req, res, next)=>{
    try {
        const {error} = schemas.register.validate(req.body)
        if(error){
            throw new CreateError(400, error.message)
        }
        const {email, password, subscription} = req.body;
        const user = await User.findOne({email});
        if(user){
            throw new CreateError(409, "Email in use");
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const avatarURL = gravatar.url(email)
        await User.create({email, subscription, avatarURL, password: hashPassword});        
        res.status(201).json({
            "user":{
                email,
                subscription
            }
        })
    } catch (error) {
        next(error)
        
    }
}

module.exports = signup;