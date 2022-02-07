const {Schema, model} = require('mongoose')
const Joi = require("joi")

const contactSchema = Schema(
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        }
      }, {versionKey: false, timestamps: true}
)

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ 
    minDomainSegments: 2, tlds: { 
      allow: ['com', 'net', 'ua'] 
    } }).required(),
  phone: Joi.number().min(7).required(),
  
})

const contactJoiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

const Contact = model("contact", contactSchema)
const schemas = {
  contact: contactJoiSchema,
  favorite: contactJoiFavoriteSchema
}

module.exports = {
  Contact,
  schemas
}