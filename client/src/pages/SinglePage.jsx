import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'


const SinglePage = () => {
  const [place, setPlace] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
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

  if (showAllPhotos) {
    console.log(place.photos)
    return (
      <div className='absolute inset-0 bg-white min-h-screen'>
        {place.photos?.length > 0 && place.photos.map((photo, index) => (
          <div key={index}>
            <img src={'http://localhost:3000/uploads/' + photo} alt="" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='mt-4 py-6 bg-gray-100 -mx-8 px-8'>
      <h1 className='text-3xl'>{place.title}</h1>
      <a className='my-2 block font-semibold underline ' target='_blank' href={'https://maps.google.com/?q='+place.address} rel="noreferrer">{place.address}</a>
      <div className="relative">
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
          <button onClick={() => setShowAllPhotos(true)} className='flex gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-xl shadow-md shadow-gray-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Show more photos
          </button>
        </div>
      </div>
      
    </div>
    
  )
}
// CHANGE LINKS BEFORE DEPLOYMENT
export default SinglePage