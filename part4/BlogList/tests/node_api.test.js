const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogModel')
const api = (supertest(app))
const helper = require('./test_helper')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')




beforeEach(
    async() => {
        //Creates the initial users
        await User.deleteMany({})
        const userObject = helper.initialUsers.map(user => new User(user))
        const userPromiseArray = userObject.map(user => user.save())

        //Creates the initial notes
        await Blog.deleteMany({})
        const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
        const blogPromiseArray = blogObject.map(blog => blog.save())

        //Saves users and notes to the database
        await Promise.all(blogPromiseArray, userPromiseArray)

    })


describe('when there is initially some blogs saved', () => {


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
})



describe('addition of a new blog', () => {

    //This will login a user, to be used in all of these tests. I'm not sure if the user will stay logged in after finishing this block
    let loggedUser
    beforeEach(async() => {
        loggedUser = await helper.logInUser()

    })

    test('making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async() => {

        //Login is required to get the JWT for posting
        const bodyToPost = {
            title: 'verifies that making an HTTP POST request',
            author: 'admin',
            url: 'https',
            likes: 8,

        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${loggedUser.body.token}`)
            .send(bodyToPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        //Test that the number of posts has been increased by one and the added post is the right one by title
        const response = await api.get('/api/blogs')


        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContainEqual('verifies that making an HTTP POST request')
    })


    test('Blog without content is not added.', async() => {

        const newBlog = {}
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const res = await api.get('/api/blogs')

        expect(res.body).toHaveLength(helper.initialBlogs.length)

    })

    test('the unique identifier property of the blog posts is named _id', async() => {

        const allBlogs = await api
            .get('/api/blogs')


        expect(allBlogs.body[0]._id).toBeDefined()

    })


    test('if the likes property is missing from the request, it will default to the value 0', async() => {

        const bodyToPost = {
            title: 'No likes',
            author: 'admin',
            url: 'https',
        }

        const banana = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${loggedUser.body.token}`)
            .send(bodyToPost)


        expect(banana.body.likes).toBe(0)

    })

    test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async() => {

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

})


describe('deletion of a Blog', () => {
    test('succeeds with status code 204 if id is valid', async() => {
        const loggedUser = await helper.logInUser()
        const blogsAtStart = await helper.blogsInDb()
        const userWithBlogs = await User.findById(loggedUser.body.id).populate('blogs')


        const blogToDelete = userWithBlogs.blogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .set('Authorization', `bearer ${loggedUser.body.token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContainEqual(blogToDelete.title)


    })

})

describe('updating Blogs', () => {

    test('updating number of likes of specific post', async() => {

        const blogsInDB = await api.get('/api/blogs')

        const id = blogsInDB.body[0]._id


        const newLikes = (100)



        await api
            .put(`/api/blogs/${id}`)
            .send({ newLikes }) // Este es el que me exije que sea un String



        const BlogToBeTested = await Blog.findById(id).exec()


        expect(newLikes).toBe(BlogToBeTested.likes)
    })
})

describe('when there is initially one user in db', () => {

    beforeEach(async() => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('creation succeeds with a fresh username', async() => {

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Mariano',
            name: 'Mariano Farace',
            password: 'banana'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })

    test('creation fails with proper status code and message if username already taken', async() => {

        const usersAtStart = await helper.usersInDb()
        const repeatedUser = {
            username: 'root',
            name: 'any',
            password: 'un pass cualquieras'
        }
        const result = await api
            .post('/api/users')
            .send(repeatedUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })
})

afterAll(() => {
    mongoose.connection.close()
})