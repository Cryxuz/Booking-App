import { Link } from 'react-router-dom'
import { AccountNavigation } from './AccountNavigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PlaceImg from '../components/PlaceImg'

const PlacesPage = () => {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/user-places', { withCredentials: true })
      .then(({ data }) => {
        console.log('Received data from placesPage:', data);
        setPlaces(data);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      });
  }, []);
  
  return (
    <div>
      <AccountNavigation />
        <div className='text-center'>
          List of all added places
          <br />
        <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new place
        </Link>
      </div>
      <div className='mt-4 '>
        {places.length > 0 &&
          places.map((place) => (
          <Link to={'/account/places/' + place._id} className='mb-6 flex cursor-pointer bg-gray-100 p-4 rounded-2xl gap-4' key={place._id}>
           
              <PlaceImg place={place} />
            
            <div className='grow-0 shrink'>
              <h2 className='text-xl'>{place.title}</h2>
              <p className='text-sm mt-2'>{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PlacesPage