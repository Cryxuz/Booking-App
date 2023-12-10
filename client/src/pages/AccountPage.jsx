import { useContext } from "react"
import { UserContext } from "../UserContext.jsx"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

export const AccountPage = () => {
  const {ready, user, setUser} = useContext(UserContext)
  const [redirect, setRedirect ] = useState(null)
  let {subpage} = useParams()
  
  if (subpage === undefined) {
    subpage = 'profile'
  }
  console.log(subpage)

  async function logout() {
    try {
      await axios.post('/logout')
      setUser(null)
      setRedirect('/')
    } catch (err) {
      console.log(err)
    }
   
  }

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
  if(redirect) {
    return <Navigate to={redirect} />
  }


  return (
    <div>
      <nav className="w-full flex mt-8 gap-2 justify-center mb-8">
        <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>My accomodations</Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-md mx-auto">
          Logged in as {user.name} ({user.email})
          <button onClick={logout} className="primary mt-2 max-w-sm">Log out</button>
        </div>
      )}
    </div>
  )
}
