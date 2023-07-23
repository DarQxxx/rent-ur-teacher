import {redirect, useNavigate} from "react-router-dom";

export async function getAuthToken(){
    return new Promise((resolve) => {
        const token = localStorage.getItem('token')
        resolve(token)
    })
}

export async function checkAuthLoader() {
    const token = await getAuthToken();
    if (!token){
        return redirect("/login")
    }
    return null
}
