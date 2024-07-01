const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))
// morgan.token("req-body", (req) => {
//   return JSON.stringify(req.body)
// })
// const customFormat =
//   ":method :url :status :res[content-length] - :response-time ms :req-body"
// app.use(morgan(customFormat))

let phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

const generateId = () => {
  const randomId = Math.floor(Math.random() * 1000)
  const letters = ["e", "b", "c"]
  const randomLetters = letters[Math.floor(Math.random() * letters.length)]
  return String(randomId + randomLetters)
}

app.get("/info", (request, response) => {
  response.send(
    `<p>Phone book has info for ${phoneBook.length}</p>
    <p>${new Date(Date.now())}</p>`
  )
})

app.get("/api/persons", (request, response) => {
  response.json(phoneBook)
})

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  const person = phoneBook.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  const persons = []
  phoneBook.forEach((person) => {
    persons.push(person.name)
  })

  if (!body.name) {
    return response.status(400).json({
      error: "Name is missing",
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: "Number is missing",
    })
  }
  if (persons.includes(body.name)) {
    return response.status(400).json({
      error: "Names must be unique",
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  phoneBook = phoneBook.concat(person)
  response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  persons = phoneBook.filter((person) => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
