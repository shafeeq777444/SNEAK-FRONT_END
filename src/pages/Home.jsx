/* eslint-disable react-hooks/exhaustive-deps */

import NavBar from '../components/Home/NavBar'

import { Outlet } from 'react-router-dom'
import Footer from '../components/Home/Footer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { refreshId } from '../redux/thunks/userThunk'


const Home = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(refreshId())
  },[])
  return (
    <div>
      <NavBar/>
     
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Home
