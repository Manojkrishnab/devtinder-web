import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../store/slices/connectionsSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);

    const fetchConnections = async () => {
        if (connections) return;
        try {
            const response = await axios.get(BASE_URL + 'user/connections', { withCredentials: true });
            const connectionsData = response.data.data;
            dispatch(addConnections(connectionsData));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if (connections?.length === 0) {
        return (
            <h2 className='text-white text-2xl text-center mt-3'>No Connections Found!</h2>
        )
    }

    return (
        <>
            <div className='flex flex-col items-center gap-3 pt-3'>
                <h1 className='text-center text-white text-xl'>Connections</h1>
                {connections?.map((connection, index) => {
                    const { firstName, lastName, about, photoUrl } = connection;
                    return (
                        <div key={index} className='flex gap-5 items-center bg-base-300 w-1/3 p-3 rounded-lg'>
                            <img className='w-24 h-24 rounded-full object-cover' src={photoUrl} alt='DevTinder' />
                            <div className=''>
                                <h2 className='text-white'>{firstName} {lastName}</h2>
                                <p className=''>{about}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Connections