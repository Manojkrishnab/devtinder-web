import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { filterFeed } from '../store/slices/feedSlice';

const UserCard = ({user}) => {
    const {_id, firstName, lastName, about, gender, age, photoUrl} = user;
    const dispatch = useDispatch();
    
    const handleFeedUser = async (status, userId) => {
        try {
           const response = await axios.post(BASE_URL + "request/send/" + status + "/" + userId, null, {withCredentials: true});
           if (response.data.message === "Request sent successfully") {
                dispatch(filterFeed(userId));
           }
        } catch (error) {
            console.error("Error: " + error.message);
        }
    }

    return (
        <>
            <div className="card card-side bg-base-300 shadow-xl w-4/5 lg:w-1/3 mx-auto p-2">
                <figure className=''>
                    <img className='w-36 h-36 rounded-full object-cover'
                        src={photoUrl}
                        alt="Feed" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p className=''>{gender && gender} {age && age+"years"}</p>
                    <p className=''>{about && about}</p>
                    <div className="card-actions justify-start mt-2">
                        <button onClick={() => handleFeedUser("interested", _id)} className="btn btn-primary mr-2">Interested</button>
                        <button onClick={() => handleFeedUser("ignored", _id)} className="btn btn-secondary">Ignore</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCard;