import { useContext } from "react"
import { UserContext } from "../UserContext.jsx"
import { Link, Navigate } from "react-router-dom"

export const AccountPage = () => {
  const {ready, user} = useContext(UserContext)

  if(!ready) {
    return 'Loading...'
  }

  if(ready && !user) {
    return <Navigate to={'/login'} />
  }
  
  return (
    <div>
      <nav className="w-full flex mt-8 gap-2 justify-center">
        <Link className="py-2 px-4 bg-primary text-white rounded-full" to={'/account'}>My profile</Link>
        <Link className="py-2 px-4" to={'/account/bookings'}>My bookings</Link>
        <Link className="py-2 px-4" to={'/account/places'}>My accomodations</Link>
      </nav>
    </div>
  )
}
