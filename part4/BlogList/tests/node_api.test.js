const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogModel')
const api = (supertest(app))
const helper = require('./test_helper')



beforeEach(
    async() => {
        await Blog.deleteMany({})
        let blogObject = new Blog(helper.initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(helper.initialBlogs[1])
        await blogObject.save()
    }
)




test('blogs are returned as json', async() => {

    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

})

test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('a specific blog is returned within the returned blogs', async() => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContainEqual('Primer blog del dest')
})


test('verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async() => {

    const newPost = {
        title: 'verifies that making an HTTP POST request',
        author: 'admin',
        url: 'https',
        likes: 8
    }


    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    //Test that the number of posts has been increased by one and the added post is the right one by title
    const response = await api.get('/api/blogs')


    const titles = await response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContainEqual('verifies that making an HTTP POST request')
})


test('Blog wtihout content is not added.', async() => {

    const newBlog = {}
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.initialBlogs.length)

})

test('verifies that the unique identifier property of the blog posts is named _id', async() => {

    const allBlogs = await api
        .get('/api/blogs')


    expect(allBlogs.body[0]._id).toBeDefined()

})


test('verifies that if the likes property is missing from the request, it will default to the value 0', async() => {

    const newPost = {
        title: 'No likes',
        author: 'admin',
        url: 'https',
    }

    const banana = await api
        .post('/api/blogs')
        .send(newPost)


    expect(banana.body.likes).toBe(0)

})

test('verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async() => {

    const newPost = {
        author: 'admin',
        likes: 8
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})



afterAll(() => {
    mongoose.connection.close()
})