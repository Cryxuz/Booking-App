import express from 'express'
const app = express()
const PORT = 3000

app.get('/test', (req,res) => {
  res.json('testok')
})

app.listen(PORT)