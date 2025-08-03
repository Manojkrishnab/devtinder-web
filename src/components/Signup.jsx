import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[A-Za-z]+$/, "First name should contain only letters")
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must not exceed 30 characters"),

  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[A-Za-z]+$/, "Last name should contain only letters")
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must not exceed 30 characters"),

  emailId: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Enter a valid email address"
    ),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")
});

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register, 
        handleSubmit, 
        formState: {errors}}  = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        // console.log(data);
        try {
            const response = await axios.post(BASE_URL + 'auth/signup', data , 
                {withCredentials: true}
            );
            dispatch(addUser(response.data.data));
            navigate('/profile');
        } catch (error) {
            if (error.response.status === 400) {
                alert("Email already taken, Please try to Signin!");
            } else {
                alert("Error: " + error.message);
            }
        }
    }

    return (
        <>
            <div className='flex justify-center mb-5'>
                <div className="card bg-base-300 text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="text-center font-bold text-xl">Sign Up</h2>
                        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-4'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label mb-1">
                                        <span className="label-text text-white">Firstname</span>
                                    </div>
                                    <input {...register('firstName')} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </label>
                                <small className='text-red-600'>{errors.firstName?.message}</small>
                            </div>
                            <div className='mb-4'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label mb-1">
                                        <span className="label-text text-white">Lastname</span>
                                    </div>
                                    <input {...register('lastName')} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </label>
                                <small className='text-red-600'>{errors.lastName?.message}</small>
                            </div>
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
                                    <input {...register('password')} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </label>
                                <small className='text-red-600'>{errors.password?.message}</small>
                            </div>
                            <div className="card-actions justify-center mt-5">
                                <button type='submit' className="btn bg-base-100">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;