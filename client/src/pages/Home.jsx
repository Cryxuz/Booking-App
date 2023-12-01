import {useEffect, useState} from 'react'
import axios from 'axios'

function Home() {
  const [data, setData] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000')
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.error('Error fetching data: ', err)
    })
  })
  return (
    <h1>{data}</h1>
  )
}

export default Home
