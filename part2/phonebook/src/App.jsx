import { PersonForm } from "./components/personForm"
import { Persons } from "./components/persons"
import { Filter } from "./components/filter"
import { useEffect, useState } from "react"
import { Notification } from "./components/notification"
import { Footer } from "./components/footer"
import personsService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [type, setType] = useState("")

  useEffect(() => {
    personsService.getAll().then((data) => {
      setPersons(data)
    }, [])
  })

  const [filter, setFilter] = useState([])
  return (
    <div>
      <h1>Phone book</h1>

      <Notification message={message} type={type} />

      <Filter setFilter={setFilter} persons={persons} />

      <h3>Add an entry</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setType={setType}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filter={filter}
        setMessage={setMessage}
        setType={setType}
      />

      <Footer />
    </div>
  )
}

export default App
