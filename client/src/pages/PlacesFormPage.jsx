import {useState} from 'react'
import Perks from '../Perks'
import PhotosUploader from '../PhotosUploader'
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import { AccountNavigation } from './AccountNavigation'


const PlacesFormPage = () => {
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const [redirect, setRedirect] = useState(false)
  const [addedPhotos, setAddedPhotos] = useState([])
  

  const handlePhotosChange = (newPhotos) => {
    setAddedPhotos(newPhotos);
  };

  function inputHeader(text) {
    return <h2 className='mt-4 text-2xl' htmlFor='title'>{text}</h2>;
  }

  function preInput(headerText) {
    return (
      <div>
        {inputHeader(headerText)}
      </div>
    );
  }
  
  async function addNewPlace (evt) {
    evt.preventDefault()
   
   await axios.post('/places', {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests
    },
    {
      withCredentials:true
    })
    setRedirect(true)
  }


  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div> 
      <AccountNavigation />
      <form onSubmit={addNewPlace}>
        {/* title */}
        {preInput('Title')}
        <input 
          value={title} 
          onChange={evt => setTitle(evt.target.value)} 
          id='title' 
          type="text" 
          placeholder='Title: My lovely apartment' 
        /> 
        {/* address */}
        {preInput('Address')}
        <input 
          value={address} 
          onChange={evt => setAddress(evt.target.value)} 
          id='address' 
          type="text" 
          placeholder='Address: 123 Fake Street' 
        /> 
        {/* photos */}
        {preInput('Photos')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={handlePhotosChange}/>
        {/* description */}
        {preInput('Description')}
        <textarea 
          value={description} 
          onChange={evt => setDescription(evt.target.value)} 
        />
        {/* perks */}
        {preInput('Perks')}
        <div className='mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {/* extra info */}
        {preInput('Extra Info')}
        <p className='text-sm text-gray-500'>House rules, etc.</p>
        <textarea 
          value={extraInfo} 
          onChange={evt => setExtraInfo(evt.target.value)}
          />
        {/* check in & out */}
        {preInput('Check in & out times')}
        <div className='grid gap-2 sm:grid-cols-3'>
          {/* check in */}
          <div>
            <h3 className='mt-2 -mb-1'>Check in time:</h3>
            <input 
              value={checkIn} onChange={evt => setCheckIn(evt.target.value)}
              type="text" 
              placeholder='14:00'
            />
          </div>
          {/* check out */}
          <div>
            <h3 className='mt-2 -mb-1'>Check out time:</h3>
            <input
              value={checkOut} 
              onChange={evt => setCheckOut(evt.target.value)} 
              type="text" 
              placeholder='11:00'
            />
          </div>
          {/* max guests */}
          <div>
            <h3>Max guests</h3>
            <input 
              value={maxGuests} 
              onChange={evt => setMaxGuests(evt.target.value)}
              type="number" 
            />
          </div>
        </div>  
        <div className='flex justify-center'>
          <button className='primary my-4 md:max-w-[50%] '>Save</button>
        </div>        
      </form>
    </div>
  )
}

export default PlacesFormPage