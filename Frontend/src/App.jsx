import React, { useEffect, useState } from 'react'
import { Route,Routes } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import Login from './Pages/Login'
import Home from './Pages/Home'
import NavBar from './Components/Navbar'
import './index.css'
import { useSelector } from 'react-redux'
import Reset from './Pages/Reset'
import Add from './Pages/Add'
import AdminHome from './Pages/AdminHome'
import Dashboard from './Pages/Dashboard'
import PgDashboard from './Pages/PgDashboard'
import SearchResult from './Pages/SearchResult'
import Explore from './Pages/Explore'
import MyPG from './Pages/MyPG'
import ViewPG from './Pages/ViewPG'
import Profile from './Pages/Profile'
import BookingPage from './Pages/BookingPage'
import Payment from './Pages/Payment'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { url } from './utils/constant'
import MyBookings from './Pages/MyBookings'
import Tenant from './Pages/Tenants'



function App() {
  const [showLogin,setShowLogin]=useState(false)
  const {token,user}=useSelector(state=>state.auth)
  const [stripeApiKey,setStripeApiKey]=useState("")
  let admin=false;
  if(user && user.userType=="pgOwner"){
    admin=true;
  }
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`${url}/make/stripeKey`,{
        headers: {
            Authorization:`Bearer ${token}`,
        },
    });
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error('Error fetching Stripe API key:', error);
    }
  }
  useEffect(()=>{
    getStripeApiKey()
  },[token]);  
  return (
    <div className="app">
      <ToastContainer/>
        <NavBar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={!admin?<Home/>:<AdminHome/>} />
          <Route path="/login" element={!token?<Login setShowLogin={setShowLogin} />:<Home/>} />
          <Route path="/reset-password/:token" element={<Reset />} />
          <Route path="/signup" element={!token?<Login setShowLogin={setShowLogin} />:<Home/>} />
          <Route path="/signup/verify" element={!token?<Login initialView="otpVerification" />:<Home/>} />
          <Route path="/search" element={<SearchResult/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/user/pg/:id" element={<ViewPG/>}/>
          <Route path="/user/pg/:id/booking" element={<BookingPage/>}/>
          <Route path="/user/payment/:id" element={ stripeApiKey?<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>:<Login/>}/>
          <Route path="/user/profile" element={<Profile/>}/>
          <Route path="/user/bookings" element={<MyBookings/>}/>
          <Route path="/myPG" element={<MyPG/>}/>
          <Route path="/admin/add" element={admin?<Add/>:<Home/>}/>
          <Route path="/admin/dashboard" element={user && user.userType==="pgOwner"?<Dashboard/>:<Home/>}/>
          <Route path="/admin/pg/:id" element={admin?<PgDashboard/>:<Home/>}/>
          <Route path="/admin/pg/:id/tenants" element={admin?<Tenant/>:<Home/>}/>
        </Routes>
    </div>
  )
}
export default App