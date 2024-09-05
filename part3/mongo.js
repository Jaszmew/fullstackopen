const mongoose = require("mongoose")

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackopen.9math.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FullStackOpen
`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Entry = mongoose.model("Entry", phoneBookSchema)

const entry = new Entry({
  name: process.argv[3],
  phone: process.argv[4],
})

if (process.argv[3] && process.argv[4]) {
  entry.save().then((result) => {
    console.log(
      `Added ${process.argv[3]}'s number ${process.argv[4]} to the phonebook`
    )
    mongoose.connection.close()
  })
} else {
  console.log("Phonebook:")
  Entry.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(entry.name, entry.phone)
    })
    mongoose.connection.close()
  })
}
