const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
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

  if (!body.title || !body.url) {
    return response.status(400).end()
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  blog.save().then((savedBlog) => {
    response.status(201).json(savedBlog)
  })
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

module.exports = blogsRouter
