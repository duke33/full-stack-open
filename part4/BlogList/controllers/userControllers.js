const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userModel')

userRouter.post('/', async(request, response, next) => {
    const body = request.body


    if (!body.username) {
        return response.status(400).json({ error: 'Missing username' })
    }

    if (!body.password) {
        return response.status(400).json({ error: 'Missing password' })
    }
    if (body.username.length < 3 || body.password.length < 3) {
        return response.status(400).json({ error: 'username and password must have at least 3 characters ' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    try {
        const savedUser = await user.save()
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