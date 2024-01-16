/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import {UserContext} from '../UserContext'

const BookingWidget = ({place}) => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [redirect, setRedirect] = useState('')
  const user = useContext(UserContext)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
    }
  }, [user])

  let numberOfNights = 0;
  if(checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date (checkIn))
  }

  async function handleBooking() {
    try {
      const response = await axios.post('/bookings', {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        placeId: place._id, 
        price: numberOfNights * place.price,
      }, {
        withCredentials: true,
      });
  
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error('Booking failed:', error.response.data);
    }
  }

  if(redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className='bg-white shadow p-4 rounded-2xl'>
      <div className='text-2xl text-center my-2'>
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className='px-3 py-4'>
            <label>Check in:</label>
            <input 
              type="date" 
              value={checkIn} 
              onChange={evt => setCheckIn(evt.target.value)} />
          </div>
          <div className='px-3 py-4 border-l'>
            <label>Check out:</label>
            <input 
              type="date" 
              value={checkOut} 
              onChange={evt => setCheckOut(evt.target.value)}/>
          </div>
        </div>
        <div className='px-3 py-4 border-t'>
            <label>Number of guests:</label>
            <input 
              type="number" 
              value={numberOfGuests} 
              onChange={evt => setNumberOfGuests(evt.target.value)}/>
        </div>
        {numberOfNights > 0 && (
        <div className='px-3 py-4 border-t'>
           <label>Your full name:</label>
           <input 
             type="text"
             value={name} 
             onChange={evt => setName(evt.target.value)}/>
           <label>Phone number:</label>
           <input 
             type="tel"
             value={phone} 
             onChange={evt => setPhone(evt.target.value)}/>
        </div>
        )}
      </div>
      <button onClick={handleBooking} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && (
          <span> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  )
}

export default BookingWidget