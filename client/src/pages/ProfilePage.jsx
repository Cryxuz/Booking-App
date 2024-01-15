import { useContext } from "react"
import { UserContext } from "../UserContext.jsx"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import PlacesPage from "./PlacesPage.jsx"
import { AccountNavigation } from "./AccountNavigation.jsx"

export const ProfilePage = () => {
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
      setRedirect('/')
      setUser(null)
    } catch (err) {
      console.log(err)
    } 
  }

  if(!ready) {
    return 'Loading...'
  }

  if(ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if(redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <AccountNavigation />
      {subpage === 'profile' && (
        <div className="text-center max-w-md mx-auto">
          Logged in as {user.name} 
          <br />
          ({user.email})
          <button onClick={logout} className="primary mt-2 max-w-sm">Log out</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  )
}
