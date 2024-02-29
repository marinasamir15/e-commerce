import React, { useContext, useEffect } from 'react';
import Navbar from './../Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import { userContext } from '../../context/TokenContext';
import Footer from '../Footer/Footer';

export default function Layout() {
 let {setToken}= useContext(userContext)
 
  useEffect(()=>{
if (localStorage.getItem('userToken')!==null){
  setToken(localStorage.getItem('userToken'))
}
  },[])
  return (
    <div>
      
      <Navbar/>
      <div className="container">
      <Outlet/>
      </div>

      <Footer/>
    </div>
  )
}
