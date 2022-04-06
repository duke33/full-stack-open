const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async(request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1 })
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

    const body = request.body
    if (body.title === undefined) {
        return response.status(400).json({ error: 'tittle missing' })
    }

    if (body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
    }

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })

    }

    const user = await User.findById(decodedToken.id) //aca hay un problema



    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
    })
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).send(savedBlog)

    } catch (e) {
        next(e)
    }
})

blogsRouter.delete('/:id', async(request, response, next) => {

    if (!request.token) {
        response.status(401).send({ error: 'Unauthorized' })
    }

    const blogToBeDeleted = await Blog.findById(request.params.id)
    const blogOwnerId = blogToBeDeleted.user.toString()
    if (blogOwnerId === request.user) {

        try {
            await Blog.findByIdAndDelete(request.params.id) //Here you could get the deleted blog in a const and return it as response
            response.status(204).end()
        } catch (e) { next(e) }
    } else { response.status(401).send({ error: 'Unauthorized' }) }
})

blogsRouter.put('/:id', async(request, response, next) => {

    try {

        await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.newLikes })
        response.status(204).end()

    } catch (e) { next(e) }
})


module.exports = blogsRouter