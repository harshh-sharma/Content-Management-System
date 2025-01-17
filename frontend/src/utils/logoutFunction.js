import { logout } from "../redux/slices/authSlice"

const logoutUser = (navigate,dispatch) => {
    dispatch(logout());
    navigate('/login');
}

export default logoutUser;