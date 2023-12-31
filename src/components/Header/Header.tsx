import React, {useContext} from "react";
import "./Header.scss";
import {Link, Outlet, useNavigate} from "react-router-dom";
import AuthContext from "../../context/store/auth-context";
import ToastList from "../ToastList/ToastList";
import ToastContext from "../../context/store/toast-context";
const Header: React.FC = () => {
    const ctx = useContext(AuthContext);
    const toastCtx = useContext(ToastContext);
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="header d-flex justify-content-xxl-around justify-content-between  w-100 align-items-center p-3 flex-row mb-5">
                <Link to="/" className="header__title font--28">
                    Rent<span className="fw-bold">Your</span>Teacher
                </Link>
                <div className="header__menu d-flex gap-2 align-items-center gap-4">
                    {   !ctx.loginToken ?
                        <Link to='/login' className="font--14 text--white text-decoration-none fw-bold">Zaloguj</Link> :
                        <Link to='/login' onClick={ctx.onLogout} className="font--14 text--white text-decoration-none fw-bold">Wyloguj</Link>
                    }
                    <Link to='/offers/add' className="btn-ryt btn-ryt--white">Dodaj ogłoszenie</Link>
                </div>
            </div>
            <ToastList toasts={toastCtx.toastList} />
            <Outlet/>
        </div>

    );
};

export default Header;
