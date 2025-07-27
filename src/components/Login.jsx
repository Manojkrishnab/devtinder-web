import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';

const schema = Yup.object().shape({
    emailId: Yup.string().required("Email is required").email("Email is not valid"),
    password: Yup.string().required("Password is required")
})

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store => store.user);

    const {register, 
        handleSubmit, 
        formState: {errors}}  = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        // console.log(data);
        try {
            const response = await axios.post(BASE_URL + 'auth/login', data , 
                {withCredentials: true}
            );
            dispatch(addUser(response.data.data));
            navigate('/');
        } catch (error) {
            // console.error("Error: " + error?.response?.data?.message);
            if (error.response.status === 401) {
                alert("Invalid login credentials.");
            } else {
                alert("Server error: " + error.response.status);
            }
        }
    }

    return (
        <>
            <div className='flex justify-center my-12'>
                <div className="card bg-base-300 text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="text-center font-bold text-xl">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-4'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label mb-1">
                                        <span className="label-text text-white">Email ID</span>
                                    </div>
                                    <input {...register('emailId')} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </label>
                                <small className='text-red-600'>{errors.emailId?.message}</small>
                            </div>
                            <div className='mb-4'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label mb-1">
                                        <span className="label-text text-white">Password</span>
                                    </div>
                                    <input {...register('password')} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </label>
                                <small className='text-red-600'>{errors.password?.message}</small>
                            </div>
                            <div className="card-actions justify-center mt-5">
                                <button type='submit' className="btn bg-base-100">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;