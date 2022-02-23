const mongoose = require('mongoose')
const Person = require('./models/person')



if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}
console.log('process.argv[2]: ', process.argv[2])
const password = process.argv[2]
const url = `mongodb+srv://testmariano:${password}@cluster0.kyzvi.mongodb.net/fso-part3?retryWrites=true&w=majority`



console.log('type of url', typeof url)
mongoose.connect(url)



if (process.argv.length === 5){

  console.log('los argv:', process.argv)//!
  console.log('process.argv.length: ', process.argv.length)//!


  const name = process.argv[3]
  const number = process.argv[4]

  //node mongo.js yourpassword Anna 040-1234556

  let newPerson = new Person({
    name:name,
    number:number
  })
  newPerson.save().then(savedPerson => {
    console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
    mongoose.connection.close()
  })



}

if (process.argv.length === 3){

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
      mongoose.connection.close()
    })
  }
  )

}
