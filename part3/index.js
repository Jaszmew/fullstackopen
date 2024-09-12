require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const Entry = require("./models/entry")

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
// morgan.token("req-body", (req) => {
//   return JSON.stringify(req.body)
// })
// const customFormat =
//   ":method :url :status :res[content-length] - :response-time ms :req-body"
// app.use(morgan(customFormat))

const generateId = () => {
  const randomId = Math.floor(Math.random() * 1000)
  const letters = ["e", "b", "c", "g"]
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

app.get("/api/persons/:id", (request, response) => {
  Entry.findById(request.params.id).then((entry) => {
    if (entry) {
      response.json(entry)
    } else {
      response.status(404).end()
    }
  })
})

app.put("/api/persons/:id", (request, response) => {
  const body = request.body

  const updateEntry = {
    name: body.name,
    phone: body.phone,
  }
  Entry.findByIdAndUpdate(request.params.id, updateEntry).then(
    (updateEntry) => {
      if (updateEntry) {
        response.json()
      } else {
        response.status(404).end()
      }
    }
  )
})

app.post("/api/persons", (request, response) => {
  const body = request.body

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
  Entry.findOne({ name: body.name }).then((existingEntry) => {
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
})

app.delete("/api/persons/:id", (request, response) => {
  Entry.findByIdAndDelete(request.params.id).then((deleteEntry) => {
    response.status(204).end()
  })
})
