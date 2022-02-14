const CreateError = require("http-errors")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
require("dotenv").config();

const {User, schemas} = require("../../models/user")

const {SECRET_KEY} = process.env

const login = async(req, res, next)=> {
    try {
        const {error} = schemas.register.validate(req.body)
        if(error){
            throw new CreateError(400, error.message)
        }
        const {email, password} = req.body;

        const user = await User.findOne({email})
            if(!user){
                throw new CreateError(401, "Email or password  wrong")
        }
        const compareResult = await bcrypt.compare(password, user.password);
            if(!compareResult){
                throw new CreateError(401, "Email or password  wrong")
       }
        
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "3h"})
        await User.findByIdAndUpdate(user._id, {token})
        res.json({
            token,
            user:{
                email,
                subscription: user.subscription
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = login;