const Blog = require('../models/blogModel')
const app = require('../app')
const User = require('../models/userModel')
var mongoose = require('mongoose')
const supertest = require('supertest')
const api = (supertest(app))


//The password used to create both users is adksjlflkjsdflk
const initialUsers = [{
        username: 'dule_33',
        name: 'Mariano',
        passwordHash: '$2b$10$x67N1oRuPbUyP4fjzlo5TOWrUqhDdh3USURamK2L8XvEINjy66v8S',
    },
    {
        username: 'floris89',
        name: 'Flor',
        passwordHash: '$2b$10$OcLbXeGlXFai5IUZ6Bg/qejhIpJMqodDLEgUcpz1UD9qLwrQ32FJC'
    }
]

const initialBlogs = [{
        title: 'Primer blog del dest',
        author: 'bananero',
        url: 'wwww cagada.com',
        likes: 132
    },
    {
        title: 'Segundo blog del dest',
        author: 'Willie',
        url: 'wwww.liberenlo.mx',
        likes: 1000
    }, {
        title: 'Tercer blog del dest',
        author: 'bananero',
        url: 'wwww cagada.com',
        likes: 8
    }, {
        title: 'Cuerto blog del dest',
        author: 'bananero',
        url: 'wwww cagada.com',
        likes: 6523
    }
]

//This function assigns Users to blog. Note that it depends on a fixed length of both, arrayOfIDs and arrayOfBlogs
const assignUsersToBlogs = (arrayOfIDs, arrayOfBlogs) => {

    arrayOfBlogs[0].user = mongoose.Types.ObjectId(arrayOfIDs[0])
    arrayOfBlogs[1].user = mongoose.Types.ObjectId(arrayOfIDs[0])

    arrayOfBlogs[2].user = mongoose.Types.ObjectId(arrayOfIDs[1])
    arrayOfBlogs[3].user = mongoose.Types.ObjectId(arrayOfIDs[1])
    return arrayOfBlogs
}

const assignBlogsToUsers = () => {
    1
}

const blogsInDb = async() => {

    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())

}

const usersInDb = async() => {
    const users = await User.find({})

    return users
}

const logInUser = async() => {

    const userToLogIn = {
        username: 'dule_33',
        password: 'adksjlflkjsdflk'
    }

    //TODO rewrite this
    const sandia = await api
        .post('/api/login')
        .send(userToLogIn)

    return sandia
}

module.exports = {
    initialUsers,
    initialBlogs,
    blogsInDb,
    usersInDb,
    assignUsersToBlogs,
    assignBlogsToUsers,
    logInUser,

}