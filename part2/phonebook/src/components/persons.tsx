import React from "react"

export const Persons = ({ persons, filter }) => {
  const personList = persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  ))
  const filteredPersons = filter.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  ))

  return filteredPersons.length > 0 ? filteredPersons : personList
}
