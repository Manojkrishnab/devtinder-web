import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, about, gender, age, photoUrl} = user;
    console.log(user);

    return (
        <>
            <div className="card row card-side bg-base-300 shadow-xl w-1/3 mx-auto">
                <figure className='col-3'>
                    <img className=''
                        src={photoUrl}
                        alt="Feed" />
                </figure>
                <div className="card-body col-9">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p className=''>{gender && gender} {age && age+"years"}</p>
                    <p className=''>{about && about}</p>
                    <div className="card-actions justify-around">
                        <button className="btn btn-primary">Interested</button>
                        <button className="btn btn-secondary">Ignore</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCard;