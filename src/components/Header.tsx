import React, {useContext} from "react";
import "./Header.scss";
import {Link, Outlet, useNavigate} from "react-router-dom";
import AuthContext from "../context/store/auth-context";
const Header: React.FC = () => {
    const ctx = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="header d-flex justify-content-xxl-around justify-content-between  w-100 align-items-center p-3 flex-row">
                <Link to="/" className="header__title font--28">
                    Rent<span className="fw-bold">Your</span>Teacher
                </Link>
                <div className="header__menu d-flex gap-2 align-items-center gap-4">
                    {   !ctx.loginToken ?
                        <Link to='/login' className="font--14 text--white text-decoration-none fw-bold">Zaloguj</Link> :
                        <Link to='/login' onClick={ctx.onLogout} className="font--14 text--white text-decoration-none fw-bold">Wyloguj</Link>
                    }

                    <Link to='/login' className="btn-ryt btn-ryt--white">Dodaj ogłoszenie</Link>
                </div>
            </div>
            <Outlet/>
        </div>

    );
};

export default Header;
