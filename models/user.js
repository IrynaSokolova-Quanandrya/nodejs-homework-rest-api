const Joi = require('joi');
const {Schema, model} = require('mongoose')

const userSchema =Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL:{
      type: String
    },
  }, {versionKey: false, timestamps: true})

  const registerJoiSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
    
  })

  const updateJoiSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });

  const User = model("user", userSchema);

  const schemas = {
      register: registerJoiSchema,
      update: updateJoiSubscriptionSchema,
  }

  module.exports = {
      User,
      schemas
  }
