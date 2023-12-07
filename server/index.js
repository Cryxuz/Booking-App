import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/User.js'

const app = express()
app.use(express.json())
const PORT = 3000
app.use(cors())
dotenv.config()

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req,res) => {
  res.json('testok')
})

app.post('/register', (req,res) => {
  const {name, email, password} = req.body
  User.create({
    name,
    email,
    password,
  })
  res.json(name, email, password)
})

app.listen(PORT)