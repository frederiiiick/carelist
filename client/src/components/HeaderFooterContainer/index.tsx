import { Outlet } from "react-router-dom";
import "./headerFooterContainer.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import actions from "../../Redux/Actions";
import { toast } from "react-toastify";


const HeaderFooterContainer = () => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const [dropdown, setDropdown] = useState(false);

    const onLogout = async() => {
        await dispatch(actions.auth.logout());
        toast.success('Logout successfully', {
            position: "top-center",
        });
    }

    return (
        <div className="header-footer-container">
            <div className="nav">
                <img className="logo" src="https://c2zyebdn.cloudimg.io/s/cdn/x/https://divin2sy6ce0b.cloudfront.net/images/2017-11-06/whiteLogo2-min.png" alt="CareLuLu" />
                {
                    user.id &&
                    <div className="login-user" onClick={() => setDropdown((prev) => !prev)}>
                        <p>
                            { user?.name.charAt(0) }
                        </p>
                        <ul className={`dropdown ${dropdown ? 'show' : 'remove'}`}>
                            <li>User: {user?.name}</li>
                            <li className="logout" onClick={onLogout}>Logout</li>
                        </ul>
                    </div>
                }
            </div>
            <Outlet />
            <div className="footer">
                <img src="https://c2zyebdn.cloudimg.io/s/cdn/x/https://divin2sy6ce0b.cloudfront.net/images/carelulu_logo_square_white.png" alt="CareLuLu" />
            </div>
        </div>
    )
}


export default HeaderFooterContainer;