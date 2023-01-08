/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    minLength: [8, 'Number must be at least 8 digits long'],
    validate: {
      validator: (number) => {
        if (number.includes('-'))
          return /^\d{2,3}-\d{5,}$/.test(number)
        else
          return /^\d{8,}$/.test(number)
      },
      message: (number) => `${number.value} is not a valid phone number!`
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)