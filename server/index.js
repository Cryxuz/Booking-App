import express from 'express'
const app = express()
const PORT = 3000

app.get('/', (req,res) => {
  res.send('hello from YELP CAMP')
})
app.listen(PORT, () =>
  console.log('listening to port: ', PORT)
)