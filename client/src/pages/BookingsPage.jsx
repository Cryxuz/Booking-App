import { useEffect, useState } from 'react'
import AccountNavigation from './AccountNavigation'
import axios from 'axios'
import PlaceImg from '../PlaceImg'
import {differenceInCalendarDays, format} from 'date-fns'

const BookingsPage = () => {

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    axios.get('bookings', { withCredentials: true}).then(response => {
      setBookings(response.data)
    })
  }, [])

  return (
    <div>
      <AccountNavigation />
      <div>
        {bookings.length > 0 && bookings.map((booking, index) => (
          <div className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden' key={index}>
            <div className='w-48'>
             <PlaceImg place={booking.place} />
            </div>
            <div className='py-3 '>
              <h2 className='text-xl'>{booking.place.title}</h2>
              <div>
                {format(new Date (booking.checkIn), 'yyyy-MM-dd')} -&gt; {format(new Date (booking.checkOut), 'yyyy-MM-dd')}
              </div>
              <div>
                Number of nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}
                Total price: ${booking.price}
              </div>
            </div> 
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage