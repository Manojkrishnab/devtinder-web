import { useSelector } from 'react-redux';
import EditProfile from '../components/EditProfile';

const Profile = () => {
  const user = useSelector(store => store.user);

  return (
    <>
        <h1 className='text-2xl text-center mt-2 mb-3'>Profile Page</h1> 
        <EditProfile {...{user}} />
    </>
  )
}

export default Profile