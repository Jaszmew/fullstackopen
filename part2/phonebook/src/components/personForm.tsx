import React from "react"
import { useState } from "react"
import personsService from "../services/persons"

export const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState("")
  const [number, setNumber] = useState("")

  const updateNumber = async (person, number) => {
    setNumber(number)
    try {
      window.confirm(
        `${newName} is already in the phone book, replace their old number?`
      )
      await personsService.update(person.id, { ...person, number: number })
      setMessage(`Updated number for ${person.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  const addEntry = (event) => {
    event.preventDefault()
    let includesName = false
    persons.forEach((person) => {
      if (person.name === newName) {
        includesName = true
        updateNumber(person, number)
      }
    })
    if (!includesName) {
      const nameObject = {
        name: newName,
        number: number,
      }
      personsService.create(nameObject).then((data) => {
        setPersons(persons.concat(data))
      })
      setMessage(`Added ${newName} with number: ${number}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    setNewName("")
    setNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }
  return (
    <div>
      <form onSubmit={addEntry}>
        <p>
          Name:
          <input
            value={newName}
            onChange={handleNameChange}
            className="nameInput"
          />
        </p>
        <p>
          Number:
          <input
            value={number}
            onChange={handleNumberChange}
            className="numberInput"
          />
        </p>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
