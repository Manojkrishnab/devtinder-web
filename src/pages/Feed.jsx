import React from 'react'
import { useSelector } from 'react-redux'

const Feed = () => {
    const user = useSelector(store => store.user);
    console.log("Feed: ", user);
    
  return (
    <>
        <h1 className='text-2xl text-center mt-8'>Feed Page</h1>
    </>
  )
}

export default Feed