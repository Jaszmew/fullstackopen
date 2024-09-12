const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message)
  })

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  phone: {
    type: String,
    minLength: 6,
    required: true,
  },
})

phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Entry", phoneBookSchema)
