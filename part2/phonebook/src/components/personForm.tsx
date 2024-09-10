import React from "react"
import { useState } from "react"
import personsService from "../services/persons"

export const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState("")
  const [phone, setPhone] = useState("")

  const updatePhone = async (person, phone) => {
    setPhone(phone)
    try {
      const confirm = window.confirm(
        `${newName} is already in the phone book, replace their old number?`
      )
      if (confirm) {
        await personsService.update(person.id, { ...person, phone: phone })
        setMessage(`Updated number for ${person.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
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
        updatePhone(person, phone)
      }
    })
    if (!includesName) {
      const nameObject = {
        name: newName,
        phone: phone,
      }
      personsService.create(nameObject).then((data) => {
        console.log(nameObject)
        setPersons(persons.concat(data))
        setMessage(`Added ${newName} with number: ${phone}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setNewName("")
        setPhone("")
      })
    }
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
          phone:
          <input
            value={phone}
            onChange={handlePhoneChange}
            className="phoneInput"
          />
        </p>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
