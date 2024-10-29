const jwt = require("jsonwebtoken")
const router = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const userExtractor = require("../utils/middleware").userExtractor

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })

  response.json(blogs)
})

router.post("/", userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user

  if (!user) {
    return response.status(403).json({ error: "user missing" })
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url missing" })
  }

  blog.likes = blog.likes | 0
  blog.user = user
  user.blogs = user.blogs.concat(blog._id)

  await user.save()

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

router.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" })
  }

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: "user not authorized" })
  }

  await blog.deleteOne()

  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== blog._id.toString()
  )

  await user.save()

  response.status(204).end()
})

router.put("/:id", userExtractor, async (request, response) => {
  const { likes } = request.body

  const existingBlog = await Blog.findById(request.params.id)
  if (!existingBlog) {
    return response.status(404).json({ error: "Blog not found" })
  }

  const updatedBlog = {
    title: existingBlog.title,
    author: existingBlog.author,
    url: existingBlog.url,
    likes: likes !== undefined ? likes : existingBlog.likes,
    user: existingBlog.user,
  }

  const savedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    {
      new: true,
      runValidators: true,
    }
  ).populate("user", { name: 1, username: 1 })

  response.json(savedBlog)
})

module.exports = router
