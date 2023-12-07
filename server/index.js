import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/User.js'
import bcrypt from 'bcryptjs'

const app = express()
dotenv.config()

const bcryptSalt = bcrypt.genSaltSync(10)
app.use(express.json())
const PORT = 3000
app.use(cors())


mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req,res) => {
  res.json('testok')
})

app.post('/register', async (req,res) => {
  const {name, email, password} = req.body
  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  })
  res.json(user)
})

app.listen(PORT)