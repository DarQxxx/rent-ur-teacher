import React from 'react';
import useValidate from "../hooks/useValidate";
import useFetch from "../hooks/useFetch";

const AuthForm: React.FC<{action: string}> = (props) => {
    const name = useValidate("name")
    const email = useValidate("email")
    const password = useValidate("password")
    const authFetch = useFetch()

    const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (name.isValid && email.isValid && password.isValid){
            authFetch('http://localhost:5000/register', {method: "POST", headers: {'Content-Type': 'application/json'}, data: {name: name.value, email: email.value, password: password.value}})
        }
    }
    return (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <form onSubmit={submitHandler} className="d-flex flex-column">
            <label htmlFor="email">Email</label>
            <input value={email.value} onBlur={email.blurHandler} onChange={email.changeHandler} type="email" name="email"/>
            {email.isError && <p>{email.errorMessage}</p>}
            <label htmlFor="fullName">Name</label>
            <input value={name.value} onBlur={name.blurHandler} onChange={name.changeHandler} type="text" name="fullName"/>
            {name.isError && <p>{name.errorMessage}</p>}
            <label htmlFor="password">Paswd</label>
            <input value={password.value} onBlur={password.blurHandler} onChange={password.changeHandler} type="password" name="password"/>
            {password.isError && <p>{password.errorMessage}</p>}
            <button type="submit">Zarejestruj</button>
        </form>
        </div>
    );
}

export default AuthForm;
