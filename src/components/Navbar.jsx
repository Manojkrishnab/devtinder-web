import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/slices/userSlice";
import { removeFeed } from "../store/slices/feedSlice";

const Navbar = () => {
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post(BASE_URL + "auth/logout", null, {
                withCredentials: true
            });
            dispatch(removeUser());
            dispatch(removeFeed());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="navbar bg-base-300">
                <div className="flex-1">
                    <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
                </div>
                {user && (
                    <div className="flex-none gap-2 flex items-center">
                        <p className="mr-1">Welcome {user.firstName}</p>
                        <div className="dropdown dropdown-end mr-5">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to='/profile' className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li onClick={handleLogout}>
                                    <Link to='#'>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar;