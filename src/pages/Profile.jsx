import React from 'react'
import { useSelector } from 'react-redux';
import EditProfile from '../components/EditProfile';

const Profile = () => {
  const user = useSelector(store => store.user);
  // console.log("Profile: ", user);

  return (
    <>
        <h1 className='text-2xl text-center my-2'>Profile Page</h1> 
        <EditProfile />
    </>
  )
}

export default Profile