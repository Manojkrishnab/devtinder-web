import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/slices/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const response = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true
      })
      // console.log("Body.jsx: " , response.data);
      dispatch(addUser(response.data));
      navigate('/');
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/login');
      } else {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, [window.location.href])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Body