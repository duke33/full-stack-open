const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')



blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {

    if (request.body.title === undefined) {
        return response.status(400).json({ error: 'tittle missing' })
    }

    if (request.body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
    }


    const blog = new Blog(
        request.body
    )

    const result = await blog.save()
    response.status(201).json(result)
})


module.exports = blogsRouter