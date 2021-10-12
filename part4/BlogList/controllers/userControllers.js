const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userModel')

userRouter.post('/', async(request, response, next) => {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    try {
        // console.log('user:', user)

        const savedUser = await user.save()

        //console.log('savedUser', savedUser)

        response.json(savedUser)
    } catch (e) { next(e) }
})



userRouter.get('/', async(request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, _id: 0 })
        response.json(users)
    } catch (e) { next(e) }

})



module.exports = userRouter