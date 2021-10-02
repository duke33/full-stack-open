const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blogModel")
const api = (supertest(app))
const helper = require("./test_helper")



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

})

test("all blogs are returned", async() => {
    const response = await api.get("/api/blogs").expect("Content-Type", /application\/json/)
    expect(response.body).toHaveLength(initialBlogs.length)
})


test("a specific blog is returned within the returned blogs", async() => {
    const response = await api.get("/api/blogs")
    const titles = response.body.map(r => r.title)
    expect(titles).toContainEqual("Primer blog del dest")
})


test("verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post", async() => {

    const newPost = {
        title: "verifies that making an HTTP POST request",
        author: "admin",
        url: "https",
        likes: 8
    }


    await api
        .post("/api/blogs")
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    //Test that the number of posts has been increased by one and the added post is the right one by title
    const response = await api.get("/api/blogs")

    console.log('type of response.body');
    console.log(typeof response.body);
    //console.log('response', response);
    console.log('response.body', response.body);


    const titles = await response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContainEqual("verifies that making an HTTP POST request")
})


test("Blog wtihout content is not added.", async() => {

    const newBlog = {}
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)

    const res = await api.get("/api/blogs")

    expect(res.body).toHaveLength(initialBlogs.length)

})

afterAll(() => {
    mongoose.connection.close()
})