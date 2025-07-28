import React from 'react'

const ProfileCard = ({ user }) => {
    return (
        <>
            <div className="card card-compact bg-base-100 w-96 shadow-xl max-w-[80vw]">
                <figure className='bg-base-300'>
                    <img className='h-[250px] mt-5'
                        src={user.photoUrlValue}
                        alt="Shoes" />
                </figure>
                <div className="card-body bg-base-300 pt-8">
                    <h2 className="card-title">{user.firstNameValue + " " + user.lastNameValue}</h2>
                    <div className='flex gap-5'>
                        <span className=''>{user.ageValue && user.ageValue + "years"}</span>
                        <span className='uppercase'>{(["male", "female"].includes(user.genderValue)) && user.genderValue}</span>
                    </div>
                    <p className=''>{user.aboutValue}</p>
                </div>
            </div>
        </>
    )
}

export default ProfileCard