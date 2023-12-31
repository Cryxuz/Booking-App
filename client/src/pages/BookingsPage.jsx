import { useEffect, useState } from 'react'
import AccountNavigation from './AccountNavigation'
import axios from 'axios'

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
          <div key={index}>
            {booking.checkIn} -&gt; {booking.checkOut}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage