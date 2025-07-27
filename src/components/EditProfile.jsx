import React from 'react'

const EditProfile = () => {
    return (
        <div className='flex justify-center mb-5'>
            <form className='bg-base-300 p-7'>
                <div className='mb-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label mb-1">
                            <span className="label-text text-white">First Name</span>
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <div className='mb-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label mb-1">
                            <span className="label-text text-white">Last Name</span>
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <div className='mb-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label mb-1">
                            <span className="label-text text-white">Photo Url</span>
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <div className='mb-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-white">Gender</span>
                        </div>
                        <select className="select select-bordered">
                            <option disabled selected>Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                </div>
                <div className='mb-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label mb-1">
                            <span className="label-text text-white">Age</span>
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <div className='mb-3'>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text text-white">About</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Type Here"></textarea>
                    </label>
                </div>

                <div className="card-actions justify-center mt-5">
                    <button type='submit' className="btn bg-base-100">Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile