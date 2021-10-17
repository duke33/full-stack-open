const mongoose = require('mongoose')



//const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    name: String,
    passwordHash: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
})

//userSchema.plugin(uniqueValidator) Temporarily disabled due to bug https://github.com/blakehaswell/mongoose-unique-validator/issues/131


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        if (document._id) { //Dirty fix for below problem: "This is problematic, because if blogs is empty it will cause an error"
            returnedObject.id = returnedObject._id.toString() //This is problematic, because if blogs is empty it will cause an error

            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.passwordHash
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User