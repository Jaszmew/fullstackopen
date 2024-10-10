const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const getTokenFrom = (request) => {
  const auth = request.get("authorization")
  if (auth && auth.startsWith("Bearer ")) {
    return auth.replace("Bearer ", "")
  }
  return null
}

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body

  const blogExists = await Blog.findById(request.params.id)

  if (!blogExists) {
    return response.status(404).end()
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  )

  response.json(updatedBlog)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body

  const token = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!token.id) {
    return response.status(401).json({ error: "Invalid token" })
  }

  const user = await User.findById(token.id)

  if (!body.title || !body.url) {
    return response.status(400).end()
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

module.exports = blogsRouter
