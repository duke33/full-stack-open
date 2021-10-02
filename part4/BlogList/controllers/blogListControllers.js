const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')
const logger = require('../utils/logger')



blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
    const blog = new Blog(
        request.body
    )

    const result = await blog.save()
    response.status(201).json(result)
})


module.exports = blogsRouter