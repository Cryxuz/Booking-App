import { useEffect, useState } from "react"
import axios from 'axios'

export default function IndexPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data)
    })
  }, [])
  console.log(places)
  return (
       <div>
        {places.length > 0 && places.map(place => (
          <div key={place.id}>
            {place.title}
          </div>
        ))}
      </div>)
}