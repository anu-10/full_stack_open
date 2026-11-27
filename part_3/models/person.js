const mongoose = require('mongoose')

const isValidPhoneNumber = (phoneNumber) => /^\d{2,3}-\d+$/.test(phoneNumber)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  number: {
    type: String,
    minLength: [8, 'Number must be at least 8 characters long'],
    required: [true, 'Number is required'],
    validate: {
      validator: isValidPhoneNumber,
      message: 'Number must have the format 2-3 digits, a dash, and more digits',
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
