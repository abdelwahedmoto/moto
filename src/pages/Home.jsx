import React from 'react'
import { UseMainContext } from '../context/MainContext'
import home from "../assets/home.png"
const Home = () => {
  const {userOnile} = UseMainContext() 
  return (
    <div className=' text-green-800'>
        <img src={home} alt="" className=' w-full'/> 
        <h1>{userOnile ? userOnile.nom_user : 'hello'}</h1>
    </div>
  )
}

export default Home