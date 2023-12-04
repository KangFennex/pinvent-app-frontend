import { useDispatch, useSelector } from "react-redux";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector(selectName);

    const logout = async () => {
        await logoutUser();
        await dispatch(SET_LOGIN(false));
        navigate("/login");
    }

    return (
        <div className="--pad header">
            <div className="--flex-between">
                <h3>
                    <span className="--fw-thin">Welcome, </span>
                    <span className="--color-danger">{name}</span>
                </h3>
                <button className="--btn --btn-danger" onClick={logout}>
                    Logout
                </button>
            </div>
            <hr />
        </div>
    )
}

export default Header
