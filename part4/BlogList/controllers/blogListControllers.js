const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')



blogsRouter.get('/', async(request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (e) { next(e) }

})

blogsRouter.post('/', async(request, response, next) => {

    if (request.body.title === undefined) {
        return response.status(400).json({ error: 'tittle missing' })
    }

    if (request.body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
    }


    const blog = new Blog(
        request.body
    )
    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (exeption) {
        next(exeption)
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