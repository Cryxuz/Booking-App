import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'



const SinglePage = () => {
  const [place, setPlace] = useState(null)
  const {id} = useParams()
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data)
    })
  }, [id])
  
  if(!place) return ''
  return (
    <div className='mt-4 py-6 bg-gray-100 -mx-8 px-8'>
      <h1 className='text-3xl'>{place.title}</h1>
      <a className='my-2 block font-semibold underline ' target='_blank' href={'https://maps.google.com/?q='+place.address} rel="noreferrer">{place.address}</a>
      <div className='grid gap-2 grid-cols-[2fr_1fr]'>
      <div>{place.photos && place.photos.length > 0 && (
        <div>
          {/* // change localhost before deploying */}
          <img className='aspect-square object-cover' src={'http://localhost:3000/uploads/'+place.photos[0]} alt="" />
        </div>
      )}</div>

        <div className='grid'>
          <div>{place.photos && place.photos.length > 0 && (

            <img className='aspect-square object-cover' src={'http://localhost:3000/uploads/'+place.photos[1]} alt="" />
          )}</div>
            <div className='overflow-hidden'>
              {place.photos && place.photos.length > 0 && (
             <img className='aspect-square object-cover relative top-2' src={'http://localhost:3000/uploads/'+place.photos[2]} alt="" />
           )}</div>
        </div>
      </div>
    </div>
  )
}

export default SinglePage