require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Routes
app.use("/users", require("./routes/authRoutes"))

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));