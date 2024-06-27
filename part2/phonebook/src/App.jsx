import { PersonForm } from "./components/personForm"
import { Persons } from "./components/persons"
import { Filter } from "./components/filter"
import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])

  const [filter, setFilter] = useState([])
  return (
    <div>
      <h2>Phone book</h2>

      <Filter setFilter={setFilter} persons={persons} />

      <h3>Add an entry</h3>

      <PersonForm persons={persons} setPersons={setPersons} />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
