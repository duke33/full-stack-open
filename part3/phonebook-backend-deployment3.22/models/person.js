const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.DBURL

console.log('connecting to', url)

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
})
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minLength: [5, 'Name must have at least 5 characeters. Sorry, no nicknames'] },
  number: { type: String, minLength: [8, 'Phone number must have at least 8 characters'] }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)