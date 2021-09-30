const { before } = require("lodash")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = (supertest(app))


const initialBlogs = [{
        title: "Pimera nota del dest",
        author: "bananero",
        url: "wwww cagada.com",
        likes: 132
    },
    {
        title: "Segunda nota del dest",
        author: "Willie",
        url: "wwww.liberenlo.mx",
        likes: 1000
    }
]


beforeEach(
    async() => {

    }
)




test("notes are returned as json", async() => {

    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

}, 10000000)

test("there are x blogs", async() => {
    const response = await api.get("/api/blogs").expect("Content-Type", /application\/json/)
    expect(response.body).toHaveLength(7)




})

afterAll(() => {
    mongoose.connection.close()
})