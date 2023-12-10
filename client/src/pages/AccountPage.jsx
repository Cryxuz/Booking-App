import { useContext } from "react"
import { UserContext } from "../UserContext.jsx"
import { Link, Navigate, useParams } from "react-router-dom"

export const AccountPage = () => {
  const {ready, user} = useContext(UserContext)
  let {subpage} = useParams()
  
  if (subpage === undefined) {
    subpage = 'profile'
  }
  console.log(subpage)
  if(!ready) {
    return 'Loading...'
  }

  if(ready && !user) {
    return <Navigate to={'/login'} />
  }

  function linkClasses (type=null) {
    let classes =  "py-2 px-4"
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full'
    }
    return classes
  }

  return (
    <div>
      <nav className="w-full flex mt-8 gap-2 justify-center">
        <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>My accomodations</Link>
      </nav>
    </div>
  )
}
