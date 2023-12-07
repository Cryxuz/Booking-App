import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()
dotenv.config()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'abcdefg'

app.use(express.json())
const PORT = 3000
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))


mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req,res) => {
  res.json('testok')
})

app.post('/register', async (req,res) => {
  const {name, email, password} = req.body
  try {

  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  })
  res.json(user)
  } catch(e) {
    res.status(400).json(e)
    console.log(e)
  }

})

app.post('/login', async (req,res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if(user) {
    // checking the password is correct
    const passOk = bcrypt.compareSync(password, user.password)

    if (passOk) {
      const token = jwt.sign({ email: user.email, id: user._id }, jwtSecret);
      res.cookie('token', token, { httpOnly: true, secure: true }).json('password correct');
    } else {
      res.json('password incorrect');
    }
  } else {
    res.status(400).json('user not found');
  }
});

app.listen(PORT)