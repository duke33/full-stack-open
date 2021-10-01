const { before } = require("lodash")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blogModel")
const api = (supertest(app))


const initialBlogs = [{
        title: "Primer blog del dest",
        author: "bananero",
        url: "wwww cagada.com",
        likes: 132
    },
    {
        title: "Segundo blog del dest",
        author: "Willie",
        url: "wwww.liberenlo.mx",
        likes: 1000
    }
]


beforeEach(
    async() => {
        await Blog.deleteMany({})
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()
    }
)




test("blogs are returned as json", async() => {

    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

}, 10000000)

test("all blogs are returned", async() => {
    const response = await api.get("/api/blogs").expect("Content-Type", /application\/json/)
    expect(response.body).toHaveLength(initialBlogs.length)
})


test("a specific blog is returned within the returned blogs", async() => {
    const response = await api.get("/api/blogs")
    const titles = response.body.map(r => r.title)
    expect(titles).toContain("Primera nota del dest")
})

afterAll(() => {
    mongoose.connection.close()
})