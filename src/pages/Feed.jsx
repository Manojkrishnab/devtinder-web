import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../store/slices/feedSlice';
import UserCard from '../components/UserCard';

const Feed = () => {
  const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);

    const fetchFeed = async () => {
      if (feed) return;
      try {
        const response = await axios.get(BASE_URL + "user/feed", {withCredentials: true});
        // console.log(response.data.users);
        dispatch(addFeed(response.data.users));
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      fetchFeed();
    }, [])

    if (feed?.length === 0) {
      return (
        <h2 className='text-2xl text-white mt-3 text-center'>No new users found!</h2>
      )
    }
    
  return (
    <>
        <h1 className='text-2xl text-white text-center my-2'>Feed Page</h1>
        {((feed !== null) && (feed.length > 0)) && <UserCard user={feed[0]} />}
    </>
  )
}

export default Feed