import React, {useEffect, useState} from "react";

interface AuthContextInterface{
    loginToken: string | null,
    onLogin: (token: string) => void
    onLogout: () => void
}

const AuthContext = React.createContext<AuthContextInterface>({
    loginToken: null,
    onLogin: (token) => {},
    onLogout: () => {}
});

export const AuthContextProvider  = ({ children }: { children: React.ReactNode }) => {
    const [loginToken, setLoginToken] = useState<string | null>(null);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoginToken((localStorage.getItem("token") as string))
        }
        return () => {};
    }, [loginToken]);

    const onLogin = (token: string) => {
        setLoginToken(token)
        localStorage.setItem("token", token);
    }
    const onLogout = () => {
        setLoginToken(null)
        localStorage.removeItem("token");
    }

    return <AuthContext.Provider value={{ loginToken: loginToken, onLogin: onLogin, onLogout: onLogout }}>{children}</AuthContext.Provider>
}

export default AuthContext
