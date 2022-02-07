const express = require("express");

const {User} = require("../../models/user")
const {authentication} = require('../../middlewares')
const router = express.Router();

router.get('./current', authentication, async(req, res, next)=>{
        const {_id} = req.body;
        await User.findByIdAndUpdate(_id, {token:''})
        res.status(204).send()
  
})

module.exports = router;
