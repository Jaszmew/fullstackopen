import React from "react"
import personsService from "../services/persons"

export const Persons = ({ persons, filter, setMessage, setType }) => {
  const deletePerson = async (person) => {
    try {
      const id = person.id
      window.confirm(`Delete ${person.name}?`)
      await personsService.deleteData(id)
      setType("successMessage")
      setMessage(`${person.name} deleted successfully`)
    } catch (err) {
      setType("errorMessage")
      setMessage(err.response.data.error)
    }
  }

  const personList = persons.map((person) => (
    <div key={person.id}>
      {person.name} {person.phone}
      <button onClick={() => deletePerson(person)}>Delete</button>
    </div>
  ))
  const filteredPersons = filter.map((person) => (
    <div key={person.id}>
      {person.name} {person.phone}
      <button onClick={() => deletePerson(person)}>Delete</button>
    </div>
  ))

  return filteredPersons.length > 0 ? filteredPersons : personList
}
