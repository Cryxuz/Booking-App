import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000
app.use(cors({
  credentials: true,
}))

app.get('/test', (req,res) => {
  res.json('testok')
})

app.listen(PORT)