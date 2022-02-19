const CreateError = require("http-errors")
const bcrypt = require("bcryptjs")
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")
const sendMail = require("../../helpers")
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
        const avatarURL = gravatar.url(email, {protocol: "http"})
        const verificationToken = nanoid();
        await User.create({email, subscription, verificationToken, avatarURL, password: hashPassword});        
        const mail = {
            to: email,
            subject: "Подтверждение",
            html: `<a target="_blank" href='http://localhost:3000/api/users/${verificationToken}'>Click here</a>`
          }
        await sendMail(mail);  
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