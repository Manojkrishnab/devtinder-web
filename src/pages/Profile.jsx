import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(store => store.user);
  console.log("Profile: ", user);

  return (
    <>
        <h1 className='text-2xl text-center mt-8'>Profile Page</h1>
    </>
  )
}

export default Profile