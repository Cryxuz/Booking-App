/* eslint-disable react/prop-types */
import axios from 'axios'
import { useEffect } from 'react'
import {createContext, useState} from 'react'

export const UserContext = createContext({})

export function UserContextProvider({children}) { 
  const [user, setUser] = useState(null)
  useEffect( () => {
    if(!user) {
      axios.get('/profile', {withCredentials: true}).then(({data}) => {
        setUser(data)
      })
    }
  }, [])
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}