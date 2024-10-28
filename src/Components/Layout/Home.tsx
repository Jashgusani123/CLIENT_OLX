import React, { useEffect } from 'react'
import Navbar from '../Shared/Navbar'
import ForRecommendations from './ForRecommendations'
import Footer from '../Shared/Footer'
import { useAuth } from '../../Context/AllContext'

const Home = () => {
  const {GetUser} = useAuth()
  useEffect(()=>{
    GetUser()
  },[])
  return (
    <>
    <Navbar />
    <ForRecommendations />
    <Footer/>
    </>
  )
}

export default Home