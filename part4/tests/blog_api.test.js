const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

const bcrypt = require("bcrypt")
const User = require("../models/user")
const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test("Get all blogs as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("Get all blogs", async () => {
  const response = await api.get("/api/blogs")
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test("Add a blog", async () => {
  const newBlog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 8,
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((r) => r.title)
  assert(titles.includes("test title"))
})

test("View a blog", async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const result = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  assert.deepStrictEqual(result.body, blogToView)
})

test("Delete a blog", async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map((r) => r.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test("Id in correct format", async () => {
  const response = await api.get("/api/blogs")

  response.body.forEach((blog) => {
    assert(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test("Likes default to 0", async () => {
  const newBlog = {
    title: "test without likes",
    author: "tester",
    url: "test",
  }

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test("Missing title", async () => {
  const newBlog = {
    author: "test",
    url: "test",
    likes: 5,
  }

  await api.post("/api/blogs").send(newBlog).expect(400)
})

test("Missing URL", async () => {
  const newBlog = {
    title: "test",
    author: "test",
    likes: 5,
  }

  await api.post("/api/blogs").send(newBlog).expect(400)
})

test("Update existing blog", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlogData = {
    title: "update title",
    author: "update author",
    url: "update url",
    likes: 10,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const blogAtEnd = await helper.blogsInDb()

  const updatedBlog = blogAtEnd[0]

  assert.strictEqual(updatedBlog.title, updatedBlogData.title)
  assert.strictEqual(updatedBlog.author, updatedBlogData.author)
  assert.strictEqual(updatedBlog.url, updatedBlogData.url)
  assert.strictEqual(updatedBlog.likes, updatedBlogData.likes)
})

test("Update non-existing blog", async () => {
  const nonExistentId = "asd"

  const updatedBlogData = {
    title: "update title",
    author: "update author",
    url: "update url",
    likes: 10,
  }

  await api.put(`/api/blogs/${nonExistentId}`).send(updatedBlogData).expect(400)
})

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash("admin", 10)
  const user = new User({ username: "admin", passwordHash })

  await user.save()
})

test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: "admin",
    name: "admin",
    password: "admin",
  }

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

  const usernames = usersAtEnd.map((u) => u.username)
  assert(usernames.includes(newUser.username))
})

test("creation fails with proper statuscode and message if username already taken", async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: "root",
    name: "Superuser",
    password: "salainen",
  }

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes("expected `username` to be unique"))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

after(async () => {
  await mongoose.connection.close()
})
