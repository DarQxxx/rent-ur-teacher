import React, {useEffect, useState} from "react";
import {ToastInterface} from "../../interfaces/interfaces";
interface ToastContextInterface{
    toastList: Array<ToastInterface>
    showToast: (toast: ToastInterface) => void
    removeToast: (id: number) => void
}

const ToastContext = React.createContext<ToastContextInterface>({
    toastList: [],
    showToast: (toast) => {},
    removeToast: (toastId) => {}
});

export const ToastContextProvider  = ({ children }: { children: React.ReactNode }) => {
    const [toastList, setToastList] = useState<Array<ToastInterface>>([]);
    const showToast = (toast: ToastInterface) => {
        setToastList((prevState) => [...prevState, {...toast, id: new Date().getTime()}])
    }
    const removeToast = (toastId: number) => {
        setToastList((prevState) => prevState.filter((toast) => toast.id !== toastId
        ))
    }

    return <ToastContext.Provider value={{ toastList: toastList, showToast: showToast, removeToast: removeToast }}>{children}</ToastContext.Provider>
}

export default ToastContext
