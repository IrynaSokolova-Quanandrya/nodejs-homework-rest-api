const express = require("express")
const CreateError = require("http-errors")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
require("dotenv").config();


const {User, schemas} = require('../../models/user')
const { authenticate } = require("../../middlewares");

const router = express.Router()

const {SECRET_KEY} = process.env

router.post('/signup', async(req, res, next)=>{
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
        await User.create({email, subscription, password: hashPassword});        
        res.status(201).json({
            "user":{
                email,
                subscription
            }
        })
    } catch (error) {
        next(error)
        
    }
})

router.post("/login", async(req, res, next)=> {
    try {
        const {error} = schemas.register.validate(req.body)
        if(error){
            throw new CreateError(400, error.message)
        }
        const {email, password} = req.body;
        const user = await User.findOne({email})
        const compareResult = await bcrypt.compare(password, user.password);
        if(!user || !compareResult){
            throw new CreateError (401, "Email or password  wrong")
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
})

router.get('/current', authenticate, async (req, res, next) => {
    const{ email, subscription} = req.user
    res.json({
        email,
        subscription
    })
})

router.get('/ logout', authenticate, async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204).send()
})

router.patch("/subscription", authenticate, async (req, res, next) => {
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
  });
module.exports = router;
