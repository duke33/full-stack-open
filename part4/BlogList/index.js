const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/noteModel')



mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send("Hello!!!!")
})



app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    logger.info('request.body from console.log:::', request.body);
    const blog = new Blog(
        request.body
    )

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = config.PORT
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})