
import { useParams } from 'react-router-dom'

const Booking = () => {
  const {id} = useParams()
  return (
    <div>Booking single: {id}</div>
  )
}

export default Booking