import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

export default function IndexPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then(response => {
      // delete
      setPlaces(response.data)
    })
  }, [])
  return (
       <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {places.length > 0 && places.map(place => (
          <Link to={'/place/'+place._id} key={place._id}>
            <div className="flex mb-2">
              {place.photos?.[0] && (
                  <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:3000/uploads/' + place.photos?.[0]} alt={place.id} />
              )}
            </div>
            <h2 className="font-bold ">{place.address}</h2>
            <h3 className="text-md leading-4 text-gray-500">{place.title}</h3>
            <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
      </div>)
}