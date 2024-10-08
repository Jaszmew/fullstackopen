const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")

const Blog = require("./models/blog")

// app.use(express.static("dist"))

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path: ", request.path)
  console.log("Body: ", request.body)
  console.log("---")
  next()
}

const errorHandler = (err, request, response, next) => {
  console.error(err.message)

  if (err.name === "CastError") {
    return response.status(400).send({ error: "Bad ID" })
  } else if (err.name === "ValidationError") {
    return response.status(400).json({ error: err.message })
  }

  next(err)
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" })
}

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post("/api/blogs", (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((err) => {
      next(err)
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
