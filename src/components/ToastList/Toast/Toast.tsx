import React, {useContext, useEffect, useState} from 'react';
import "./Toast.scss"
import {ToastInterface} from "../../../interfaces/interfaces";
import ToastContext from "../../../context/store/toast-context";

const Toast: React.FC<ToastInterface> = ({message, type, id}) => {
    const [isClosed, setIsClosed] = useState<boolean>(false)
    const toastCtx = useContext(ToastContext);
    useEffect(() => {
        setTimeout(()=>{handleClose()}, 3500)
    }, []);
    const handleClose = () => {
        setIsClosed(true);
        setTimeout((() => toastCtx.removeToast(id as number)), 450)
    }

    return (
        <div className={`toast-single toast-single--${type} ${isClosed && 'toast-out'}`} role="alert" onClick={handleClose}>
            <div className="toast-message">
                <p className="mb-0">{message}</p>
            </div>
        </div>
    );
}

export default Toast;