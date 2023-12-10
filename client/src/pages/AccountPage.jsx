import { useContext } from "react"
import { UserContext } from "../UserContext.jsx"
import { Navigate } from "react-router-dom"

export const AccountPage = () => {
  const {user} = useContext(UserContext)

  if(!user) {
    return <Navigate to={'/login'} />
  }
  return (
    <div>Account for {user.name}</div>
  )
}
