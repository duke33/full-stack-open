const Blog = require('../models/blogModel')
const User = require('../models/userModel')

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
}
]

const blogsInDb = async() => {

    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())

}

const usersInDb = async() => {
    const users = await User.find({})

    return users
}


module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}