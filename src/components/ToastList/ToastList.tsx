import React from 'react';
import Toast from "./Toast/Toast";
import "./ToastList.scss"
import {ToastInterface} from "../../interfaces/interfaces";

const ToastList: React.FC<{ toasts: Array<ToastInterface> }> = ({toasts}) => {
    console.log(toasts)
    return (toasts && (
            <div className="toast-list" aria-live="assertive">
                {toasts.map((toast, index) => (
                    <Toast key={toast.id} id={toast.id} message={toast.message} type={toast.type} />
                ))}
            </div>
        )
    )
}

export default ToastList;