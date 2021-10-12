const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')


blogsRouter.get('/', async(request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 0 })
        response.json(blogs)
    } catch (e) { next(e) }

})

blogsRouter.get('/:id', async(request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, })
        response.json(blog)
    } catch (e) { next(e) }

})

blogsRouter.post('/', async(request, response, next) => {
    if (request.body.title === undefined) {
        return response.status(400).json({ error: 'tittle missing' })
    }

    if (request.body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
    }
    //To be implemented
    if (request.body.userId === undefined) {
        return response.status(400).json({ error: 'user missing' })
    }
    const user = await User.findById(request.body.userId)
    console.log('user encontrado en la base de datos en con Id provisto', user)
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        user: user._id, //TODO esto no cierra, puede ser que en lugar de :id vaya id
    })
    try {
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        console.log('user.blogs', user.blogs)
        await user.save() //TODO esto da error, esta guardando un usuario con el mismo ID en vez de reemplazar al otro, y da error de validacion
        response.status(201).json(result)

    } catch (e) {
        next(e)
    }
})

blogsRouter.delete('/:id', async(request, response, next) => {

    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (e) { next(e) }
})

blogsRouter.put('/:id', async(request, response, next) => {

    try {

        await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.newLikes })
        response.status(204).end()

    } catch (e) { next(e) }
})


module.exports = blogsRouter