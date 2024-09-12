const express = require("express")
const app = express()
require("dotenv").config()

const Entry = require("./models/entry")

app.use(express.static("dist"))

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
  }

  next(err)
}

const morgan = require("morgan")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" })
}

// morgan.token("req-body", (req) => {
//   return JSON.stringify(req.body)
// })
// const customFormat =
//   ":method :url :status :res[content-length] - :response-time ms :req-body"
// app.use(morgan(customFormat))

const generateId = () => {
  const randomId = Math.floor(Math.random() * 1000)
  const letters = ["e", "b", "c"]
  const randomLetters = letters[Math.floor(Math.random() * letters.length)]
  return String(randomId + randomLetters)
}

app.get("/info", (request, response) => {
  Entry.countDocuments({}).then((count) => {
    response.send(
      `<p>Phone book has info for ${count} people</p>
      <p>${new Date().toString()}</p>`
    )
  })
})

app.get("/api/persons", (request, response) => {
  Entry.find({}).then((entries) => {
    response.json(entries)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  Entry.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  if (!body.phone) {
    return response.status(400).json({ error: "Number missing" })
  }

  const entry = {
    name: body.name,
    phone: body.phone,
  }
  Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
    .then((updateEntry) => {
      response.json(updateEntry)
    })
    .catch((err) => next(err))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: "Data missing" })
  }

  if (!body.name) {
    return response.status(400).json({
      error: "Name is missing",
    })
  }
  if (!body.phone) {
    return response.status(400).json({
      error: "Number is missing",
    })
  }
  Entry.findOne({ name: body.name })
    .then((existingEntry) => {
      if (!existingEntry) {
        const entry = new Entry({
          name: body.name,
          phone: body.phone,
          id: generateId(),
        })
        entry.save()
        return response.status(200).end()
      }
      return response.status(400).json({ error: "Name must be unique" })
    })
    .catch((err) => next(err))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Entry.findByIdAndDelete(request.params.id)
    .then((deleteEntry) => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
