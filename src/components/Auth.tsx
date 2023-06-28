import React, {useState} from "react";
import useValidate from "../hooks/useValidate";
import useFetch from "../hooks/useFetch";
import "./Auth.scss";
import {Link, useNavigate} from "react-router-dom";

const AuthForm: React.FC<{ action: string }> = (props) => {
    const [submitResult, setSubmitResult] = useState<{ success: any, resultMsg: string }>({
        success: null,
        resultMsg: ""
    });
    const navigate = useNavigate();
    const name = useValidate("name");
    const email = useValidate("email");
    const password = useValidate("password");
    const authFetch = useFetch();

    const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        name.setIsTouched(true);
        password.setIsTouched(true);
        email.setIsTouched(true)
        setSubmitResult((prevState) => ({...prevState, success: null}))
        if (email.isValid && password.isValid && (props.action === "login" ? true : name.isValid)) {
            const data = {
                email: email.value,
                password: password.value,
                ...(props.action === "register" && {name: name.value})
            }
            authFetch(`http://localhost:5000/${props.action}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                data: data,
            }).then(r => {
                if (r.success){
                    localStorage.setItem("token", r.token);
                    navigate("/", {replace:true});
                }
                else{
                    setSubmitResult({
                        success: r.success,
                        resultMsg: r.error
                    })
                }
            });

        }
    };
    return (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center flex-column">
            {!submitResult.success && <p className="error-ryt font--18">{submitResult.resultMsg}</p>}
            <form onSubmit={submitHandler} className="d-flex flex-column auth mt-4">
                <label
                    htmlFor="email"
                    className={`label-ryt ${email.isError && "label-ryt--error"}`}
                >
                    E-mail
                </label>
                <input
                    value={email.value}
                    onBlur={email.blurHandler}
                    onChange={email.changeHandler}
                    type="email"
                    name="email"
                    className={`input-ryt ${email.isError && "input-ryt--error"}`}
                />
                {email.isError && <p className="error-ryt">{email.errorMessage}</p>}
                {props.action === "register" && (
                    <label
                        htmlFor="fullName"
                        className={`label-ryt ${name.isError && "label-ryt--error"} mt-2`}
                    >
                        Imię
                    </label>
                )}
                {props.action === "register" && (
                    <input
                        value={name.value}
                        onBlur={name.blurHandler}
                        onChange={name.changeHandler}
                        type="text"
                        name="fullName"
                        className={`input-ryt ${name.isError && "input-ryt--error"}`}
                    />
                )}
                {name.isError && props.action === "register" && (
                    <p className="error-ryt">{name.errorMessage}</p>
                )}
                <label
                    htmlFor="password"
                    className={`label-ryt ${password.isError && "label-ryt--error"} mt-2`}
                >
                    Hasło
                </label>
                <input
                    value={password.value}
                    onBlur={password.blurHandler}
                    onChange={password.changeHandler}
                    type="password"
                    name="password"
                    className={`input-ryt ${password.isError && "input-ryt--error"}`}
                />
                {password.isError && (
                    <p className="error-ryt">{password.errorMessage}</p>
                )}
                <button className="btn-ryt btn-ryt--green mt-4"
                        type="submit">{props.action === "login" ? "Zaloguj" : "Zarejestruj"}</button>
            </form>
            {props.action === "login" ? (
                <p className="font--14 mt-1 mb-0">Nie masz jeszcze konta? <Link className="fw-bold color-ryt"
                                                                                to='/register'>Zarejestruj się</Link>
                </p>) : (
                <p className="font--14 mt-1 mb-0">Masz już konto? <Link className="fw-bold color-ryt" to='/login'>Zaloguj
                    się</Link></p>)}

        </div>
    );
};

export default AuthForm;
