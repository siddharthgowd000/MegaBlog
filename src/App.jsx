import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() =>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  if(loading){
    return <h1 className='min-h-screen font-bold text-center text-black'>Loading...</h1>
  }
  
  return (
    <div className='flex flex-wrap content-between min-h-screen text-center bg-gray-400'>
      <div className='block w-full'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
      </div>
    </div>
  )
}

export default App
