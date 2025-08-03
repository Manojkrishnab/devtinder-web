import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../store/slices/requestSlice';
import { addConnections } from '../store/slices/connectionsSlice';

const ConnectionRequests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);
    // console.log(requests);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(BASE_URL + 'user/requests/received', { withCredentials: true });
            const requestsData = response.data.data;
            dispatch(addRequests(requestsData));
        } catch (error) {
            console.error(error);
        }
    }

    const fetchConnectionsData = async () => {
        try {
            const response = await axios.get(BASE_URL + 'user/connections', { withCredentials: true });
            const connectionsData = response.data.data;
            dispatch(addConnections(connectionsData));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (requests) return;
        fetchRequests();
    }, [])

    const reviewRequest = async (status, req_id) => {
        try {
            const response = await axios.post(BASE_URL + 'request/review/' + status + '/' + req_id, {}, { withCredentials: true });
            fetchRequests();
            fetchConnectionsData();
        } catch (error) {
            console.error(error);
        }
    }

    if (requests?.length === 0) {
        return (
            <h2 className='text-white text-2xl text-center mt-3'>No Requests Found!</h2>
        )
    }

    return (
        <>
            <div className='flex flex-col items-center gap-3 pt-3'>
                <h1 className='text-center text-white text-xl'>Connection Requests</h1>
                {requests?.map((request, index) => {
                    const { firstName, lastName, about, photoUrl } = request.fromUserId;
                    return (
                        <div key={index} className='flex gap-5 items-center bg-base-300 w-3/4 lg:w-1/3 p-3 rounded-lg'>
                            <img className='w-24 h-24 rounded-full object-cover' src={photoUrl} alt='DevTinder' />
                            <div className=''>
                                <h2 className='text-white font-semibold'>{firstName} {lastName}</h2>
                                <p className='mb-2'>{about}</p>
                                <button onClick={() => reviewRequest("accepted", request._id)} className='btn btn-primary mr-2'>Accept</button>
                                <button onClick={() => reviewRequest("rejected", request._id)} className='btn btn-secondary'>Reject</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ConnectionRequests