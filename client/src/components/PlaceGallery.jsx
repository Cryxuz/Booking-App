import {useState} from 'react'
import PropTypes from 'prop-types';

const PlaceGallery = ({place}) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  PlaceGallery.propTypes = {
    place: PropTypes.shape({
      title: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }

  if (showAllPhotos) {
    return (
      <div className='absolute inset-0 bg-black text-white min-h-screen'>
        <div className='bg-black p-8 grid gap-4'>
          <div>
            <h2 className='text-3xl mr-48'>Photos of {place.title}</h2>
            <button onClick={() => setShowAllPhotos(false)} className='right-12 top-8 flex gap-1 py-2 px-4 rounded-xl fixed shadow shadow-black bg-white text-black'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
               Close photos
              </button>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:px-12 lg:grid-cols-2 md:gap-6'>
            {place.photos?.length > 0 && place.photos.map((photo, index) => (
              <div key={index}>
                <img className='rounded-md object-cover w-full h-48 md:h-64 lg:h-80 xl:h-96' src={'https://mern-booking-app-xauk.onrender.com/uploads/' + photo} alt="" />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    )
  }

  return (
      <div className="relative">
        <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
          <div>{place.photos && place.photos.length > 0 && (
            <div>
              <img onClick={() => setShowAllPhotos(true)}className='cursor-pointer aspect-square object-cover' src={'https://mern-booking-app-xauk.onrender.com/uploads/'+place.photos[0]} alt="" />
            </div>
          )}</div>

          <div className='grid'>
            <div>{place.photos && place.photos.length > 0 && (

              <img onClick={() => setShowAllPhotos(true)}className='cursor-pointer aspect-square object-cover' src={'https://mern-booking-app-xauk.onrender.com/uploads/'+place.photos[1]} alt="" />
            )}</div>
              <div className='overflow-hidden'>
                {place.photos && place.photos.length > 0 && (
              <img onClick={() => setShowAllPhotos(true)}className='cursor-pointer aspect-square object-cover relative top-2' src={'https://mern-booking-app-xauk.onrender.com/uploads/'+place.photos[2]} alt="" />
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
  )
}

export default PlaceGallery