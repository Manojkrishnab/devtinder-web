import { useEffect, useState } from 'react'
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Auth = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const userData = useSelector(store => store.user);

    useEffect(() => {
        if (userData) {
            <Navigate to={'/'} replace />
        }
    }, [userData])

  return (
    <>
        <div className='flex flex-col items-center my-12'>
            <div className=''>
                <button onClick={() => setShowLoginForm(true)} className={`btn w-48 ${showLoginForm && 'btn-primary'}`}>Sign In</button>
                <button onClick={() => setShowLoginForm(false)} className={`btn w-48 ${!showLoginForm && 'btn-primary'}`}>Sign Up</button>
            </div>
            {showLoginForm ? <Login /> : <Signup />}
        </div>
    </>
  )
}

export default Auth