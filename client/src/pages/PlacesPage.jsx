import { Link, useParams } from 'react-router-dom'
import wifi from '/icons/wifi.png'
import parking from '/icons/parking.png'
import tv from '/icons/tv.png'
import washer from '/icons/washer.png'
import pets from '/icons/pets.png'
import entrance from '/icons/entrance.png'
import { useState } from 'react'


const PlacesPage = () => {
  const {action} = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState('')


  return (
    <div>
      {action !== 'new' && (
        <div className='text-center'>
        <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new place
        </Link>
      </div>
      )}
      {action === 'new' && (
        <div> 
          <form>
            {/* title */}
            <h2 className=' mt-4 text-2xl' htmlFor='title'>Title</h2>
            <input id='title' type="text" placeholder='Title: My lovely apartment' />
            {/* address */}
            <h2 className=' mt-4 text-2xl' htmlFor='address'>Address</h2>
            <input id='address' type="text" placeholder='Address: 123 Fake Street' />
            {/* photos */}
            <h2 className=' mt-4 text-2xl' htmlFor='photos'>Photos</h2>

            <div className='flex gap-2'>
              <input type="text" placeholder='Add link or file' />
              <button className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
            </div>

            <div className='grid grid-cols-3 mt-2 md:grid-cols-4 lg:grid-cols-6'>
              <button className='flex gap-2 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Upload
              </button>
            </div>
            {/* description */}
            <h2 className=' mt-4 text-2xl' htmlFor='photos'>Description</h2>
            <textarea className=''></textarea>
            {/* perks */}
            <h2 className=' mt-4 text-2xl' htmlFor='photos'>Perks</h2>
            <div className='mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
                <input type="checkbox" />
                <img src={wifi} alt="" />
                <span>Wifi</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
                <input type="checkbox" />
                <img src={parking} alt="" />
                <span>Free parking</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
                <input type="checkbox" />
                <img src={tv} alt="" />
                <span>Television</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
                <input type="checkbox" />
                <img src={washer} alt="" />
                <span>Washer</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
                <input type="checkbox" />
                <img src={pets} alt="" />
                <span>Pets allowed</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
                <input type="checkbox" />
                <img src={entrance} alt="" />
                <span>Private Entrance</span>
              </label>
            </div>
            {/* extra info */}
            <h2 className=' mt-4 text-2xl '>Extra Info</h2>
            <p className='text-sm text-gray-500'>House rules, etc.</p>
            <textarea />
            {/* check in & out */}
            <h2 className=' mt-4 text-2xl '>Check in & out times</h2>
            <div className='grid gap-2 sm:grid-cols-3'>
              {/* check in */}
              <div>
                <h3 className='mt-2 -mb-1'>Check in time:</h3>
                <input type="text" placeholder='14:00'/>
              </div>
              {/* check out */}
              <div>
                <h3 className='mt-2 -mb-1'>Check out time:</h3>
                <input type="text" placeholder='11:00'/>
              </div>
              {/* max guests */}
              <div>
                <h3>Max guests</h3>
                <input type="text" />
              </div>
            </div>  
            <div className='flex justify-center'>
              <button className='primary my-4 md:max-w-[50%] '>Save</button>
            </div>        
          </form>
        </div>
      )}

    </div>
  )
}

export default PlacesPage