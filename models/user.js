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
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  }, {versionKey: false, timestamps: true})

  const registerJoiSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
    
  })

  const updateJoiSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });

  const verifyJoiSchema = Joi.object({
    email: Joi.string().required()
  })

  const User = model("user", userSchema);

  const schemas = {
      register: registerJoiSchema,
      update: updateJoiSubscriptionSchema,
      verify: verifyJoiSchema
  }

  module.exports = {
      User,
      schemas
  }
