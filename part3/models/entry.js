const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message)
  })

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Not a valid name!"],
    required: [true, "Name required!"],
  },
  phone: {
    type: String,
    validate: {
      validator: function (number) {
        return /^\d{2,3}-\d{5,}$/.test(number)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "Phone number required!"],
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
