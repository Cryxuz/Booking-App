import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import { ProfilePage } from './pages/ProfilePage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacesPage from './pages/PlacesPage'
import SinglePage from './pages/SinglePage'
import Booking from './pages/Booking'
import BookingsPage from './pages/BookingsPage'


axios.defaults.baseURL = 'http://localhost:3000'

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/account/' element={<ProfilePage />} />
        <Route path='/account/places' element={<PlacesPage />} />
        <Route path='/account/places/new' element={<PlacesFormPage />} />
        <Route path='/account/places/:id' element={<PlacesFormPage />} />
        <Route path='/place/:id' element={<SinglePage />} />
        <Route path='/account/bookings' element={<BookingsPage />} />
        <Route path='/account/bookings/:id' element={<Booking />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}
export default App
