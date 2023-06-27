import React from "react";
import "./Header.scss";
import {Link, Outlet} from "react-router-dom";
const Header: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="header d-flex justify-content-xxl-around justify-content-between  w-100 align-items-center p-3 flex-row">
                <Link to="/" className="header__title font--28">
                    Rent<span className="fw-bold">Your</span>Teacher
                </Link>
                <div className="header__menu d-flex gap-2">
                    <Link to='/login' className="btn-ryt btn-ryt--white">Dodaj ogłoszenie</Link>
                </div>
            </div>
            <Outlet/>
        </div>

    );
};

export default Header;
