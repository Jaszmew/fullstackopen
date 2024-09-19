import React from "react"
import { useState } from "react"
import personsService from "../services/persons"

export const PersonForm = ({ persons, setPersons, setMessage, setType }) => {
  const [newName, setNewName] = useState("")
  const [phone, setPhone] = useState("")

  const updatePhone = async (person, phone) => {
    setPhone(phone)
    try {
      window.confirm(
        `${newName} is already in the phone book, replace their old number?`
      )
      await personsService.update(person.id, { ...person, phone: phone })
      setType("successMessage")
      setMessage(`Updated number for ${person.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (err) {
      setType("errorMessage")
      setMessage(err.response.data.error)
    }
  }

  const addEntry = (event) => {
    event.preventDefault()
    let includesName = false
    persons.forEach((person) => {
      if (person.name === newName) {
        includesName = true
        updatePhone(person, phone)
      }
    })
    if (!includesName) {
      const nameObject = {
        name: newName,
        phone: phone,
      }
      personsService
        .create(nameObject)
        .then((data) => {
          setPersons(persons.concat(data))
        })
        .catch((err) => {
          setType("errorMessage")
          setMessage(err.response.data.error)
        })
      setType("successMessage")
      setMessage(`Added ${newName} with number: ${phone}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    setNewName("")
    setPhone("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
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
          Phone number:
          <input
            value={phone}
            onChange={handlePhoneChange}
            className="numberInput"
          />
        </p>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
