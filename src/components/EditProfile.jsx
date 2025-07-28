import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../store/slices/userSlice';

const schema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters"),

    lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters"),

    photoUrl: Yup.string()
        .required("Photo URL is required")
        .url("Photo URL must be a valid URL"),

    gender: Yup.string()
        .required("Gender is required")
        .oneOf(["male", "female", "other"], "Invalid gender selection"),

    age: Yup.number()
        .required("Age is required")
        .typeError("Age must be a number")
        .integer("Age must be an integer")
        .min(0, "Age cannot be negative")
        .max(120, "Age seems unrealistic"),

    about: Yup.string()
        .required("About section is required")
        .min(10, "About must be at least 10 characters"),
});

const EditProfile = ({ user }) => {
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const { register, handleSubmit, setValue, watch,
        formState: { errors } } = useForm({
            resolver: yupResolver(schema)
        })

    useEffect(() => {
        if (user) {
            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("photoUrl", user.photoUrl);
            user.gender && setValue("gender", user.gender);
            setValue("age", user.age);
            setValue("about", user.about);
        }
    }, [])

    let firstNameValue = watch("firstName");
    let lastNameValue = watch("lastName");
    let photoUrlValue = watch("photoUrl");
    let genderValue = watch("gender");
    let ageValue = watch("age");
    let aboutValue = watch("about");

    const onSubmit = async (data) => {
        try {
            const response = await axios.patch(BASE_URL + "profile/edit", data, {withCredentials: true});
            dispatch(addUser(response.data.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2500);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='flex justify-center flex-wrap gap-10 mb-5'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-base-300 p-7 max-w-[80vw]'>
                    <div className='mb-3'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-1">
                                <span className="label-text text-white">First Name</span>
                            </div>
                            <input {...register('firstName')} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label> <br />
                        {errors?.firstName && <small className='text-red-600'>{errors?.firstName.message}</small>}
                    </div>
                    <div className='mb-3'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-1">
                                <span className="label-text text-white">Last Name</span>
                            </div>
                            <input {...register('lastName')} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label> <br />
                        {errors?.lastName && <small className='text-red-600'>{errors?.lastName.message}</small>}
                    </div>
                    <div className='mb-3'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-1">
                                <span className="label-text text-white">Photo Url</span>
                            </div>
                            <input {...register('photoUrl')} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label> <br />
                        {errors?.photoUrl && <small className='text-red-600'>{errors?.photoUrl.message}</small>}
                    </div>
                    <div className='mb-3'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text text-white">Gender</span>
                            </div>
                            <select {...register('gender')} className="select select-bordered">
                                <option disabled defaultValue={""}>Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label> <br />
                        {errors?.gender && <small className='text-red-600'>{errors?.gender.message}</small>}
                    </div>
                    <div className='mb-3'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-1">
                                <span className="label-text text-white">Age</span>
                            </div>
                            <input {...register('age')} type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label> <br />
                        {errors?.age && <small className='text-red-600'>{errors?.age.message}</small>}
                    </div>
                    <div className='mb-3'>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text text-white">About</span>
                            </div>
                            <textarea {...register('about')} className="textarea textarea-bordered h-24" placeholder="Type Here"></textarea>
                        </label> <br />
                        {errors?.about && <small className='text-red-600'>{errors?.about.message}</small>}
                    </div>

                    <div className="card-actions justify-center mt-5">
                        <button type='submit' className="btn bg-base-100">Save</button>
                    </div>
                </form>
                <ProfileCard user={{firstNameValue,lastNameValue,photoUrlValue,genderValue,ageValue,aboutValue}} />
            </div>

            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditProfile