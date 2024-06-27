import React from "react"
import { useState } from "react"

export const PersonForm = (props) => {
  const [newName, setNewName] = useState("")
  const [number, setNumber] = useState("")

  const addEntry = (event) => {
    event.preventDefault()
    console.log(props)
    let includesName = false
    props.persons.forEach((person) => {
      if (person.name === newName) {
        includesName = true
        return window.alert(`${newName} is already in the phone book`)
      }
    })
    if (!includesName) {
      const nameObject = {
        name: newName,
        number: number,
        id: props.persons.length + 1,
      }
      console.log(nameObject)
      props.setPersons(props.persons.concat(nameObject))
      setNewName("")
      setNumber("")
    }
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
          Name: <input onChange={handleNameChange} />
        </p>
        <p>
          Number: <input onChange={handleNumberChange} />
        </p>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
