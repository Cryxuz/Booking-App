import { useEffect, useState } from "react"
import axios from 'axios'

export default function IndexPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces([...response.data, ...response.data, ...response.data, ...response.data,])
    })
  }, [])
  console.log(places)
  return (
       <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {places.length > 0 && places.map(place => (
          <div key={place.id}>
            <div className="flex mb-2">
              {place.photos?.[0] && (
// CHANGE LOCALHOST BEFORE DEPLOYING
                  <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:3000/uploads/' + place.photos?.[0]} alt={place.id} />
              )}
            </div>
            <h2 className="text-md truncate leading-4">{place.title}</h2>
            <h3 className="font-bold ">{place.address}</h3>
          </div>
        ))}
      </div>)
}