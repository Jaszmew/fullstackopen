import React from "react"

export const Filter = ({ setFilter, persons }) => {
  const filterNames = (event) => {
    console.log(event)
    const filteredPersons = persons.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        number.includes(event.target.value)
    )
    setFilter(filteredPersons)
  }

  return (
    <div>
      Filter entries: <input onChange={filterNames} />
    </div>
  )
}
