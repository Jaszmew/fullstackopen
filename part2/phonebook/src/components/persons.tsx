import React from "react"
import personsService from "../services/persons"

export const Persons = ({ persons, filter, setPersons }) => {
  const deletePerson = async (person) => {
    try {
      const id = person.id
      window.confirm(`Delete ${person.name}?`)
      await personsService.deleteData(id)
    } catch (err) {
      console.log(err)
    }
  }

  const personList = persons.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>Delete</button>
    </div>
  ))
  const filteredPersons = filter.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>Delete</button>
    </div>
  ))

  return filteredPersons.length > 0 ? filteredPersons : personList
}
