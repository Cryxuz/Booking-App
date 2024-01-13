
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Booking = () => {
  const {id} = useParams()

  const [booking, setBooking] = useState(null)
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id)
        if(foundBooking) {
          setBooking(foundBooking)
        }
      })
    }
  }, [id])
  return (
    <div>Booking single: {id}</div>
  )
}

export default Booking