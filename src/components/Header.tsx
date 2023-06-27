import React from "react";
import "./Header.scss";
const Header: React.FC = () => {
    return (
        <div className="header d-flex justify-content-around w-100 align-items-center p-3 flex-column flex-md-row">
            <a href="/" className="header__title font--48">
                Rent<span className="fw-bold">Your</span>Teacher
            </a>
            <div className="header__menu d-flex gap-2">
                <div className="header__menu-item">profile</div>
                <div className="header__menu-item">login</div>
                <div className="header__menu-item">fav</div>
            </div>
        </div>
    );
};

export default Header;
