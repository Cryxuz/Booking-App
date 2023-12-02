import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
  console.log("Database connected")
})

const app = express()
const PORT = 3000
app.use(cors())

app.get('/', (req,res) => {
  res.json('Hello')
})

app.listen(PORT, () =>
  console.log('listening to port: ', PORT)
)