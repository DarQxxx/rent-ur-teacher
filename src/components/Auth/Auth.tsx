import React, {useContext, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import "./Auth.scss";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../context/store/auth-context";

type RegisterInputs = {
    email: string,
    name: string,
    password: string
};
const AuthForm: React.FC<{ action: string }> = (props) => {
    const [submitResult, setSubmitResult] = useState<{ success: any, resultMsg: string }>({
        success: null,
        resultMsg: ""
    });
    const navigate = useNavigate();
    const authFetch = useFetch();
    const ctx = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({
        mode: "onTouched"
    });

    const onSubmit: SubmitHandler<RegisterInputs> = data => {
        authFetch(`http://localhost:5000/${props.action}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {...data},
        }).then(r => {
            if (r.success) {
                ctx.onLogin(r.result)
                localStorage.setItem("token", r.result);
                navigate("/", {replace: true});
            } else {
                setSubmitResult({
                    success: r.success,
                    resultMsg: r.result
                })
            }
        });
    };

    return (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center flex-column">
            {!submitResult.success && <p className="font--18 fw-bold text--red mb-0">{submitResult.resultMsg}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column auth mt-4">
                <div className="d-flex flex-column mb-3">
                    <label className={`label-ryt ${errors.email && "label-ryt--error"} font--14`} htmlFor="email">E-mail</label>
                    <input id="input_email" type="email" {...register("email", { required: {value: true, message: "Wpisz swój e-mail"}, pattern: {value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i, message: "Wpisz poprawny email"}})} name="email" className={`input-ryt ${errors.email && "input-ryt--error"}`}/>
                    {errors.email && errors.email?.message && <span className="error-ryt">{errors.email.message}</span>}
                </div>
                {props.action === "register" && (
                    <div className="d-flex flex-column mb-3">
                        <label className={`label-ryt ${errors.name && "label-ryt--error"} font--14`} htmlFor="name">Pełne imię</label>
                        <input id="input_name" {...register("name", { required: {value: true, message: "Wpisz swoje imię i nazwisko"}})} name="name" className={`input-ryt ${errors.name && "input-ryt--error"}`}/>
                        {errors.name && errors.name?.message && <span className="error-ryt">{errors.name.message}</span>}
                    </div>
                )}
                <div className="d-flex flex-column mb-2">
                    <label className={`label-ryt ${errors.password && "label-ryt--error"} font--14`} htmlFor="password">Hasło</label>
                    <input type='password' id="input_password" {...register("password", { required: {value: true, message: "Wpisz swoje hasło"}})} name="password" className={`input-ryt ${errors.password && "input-ryt--error"}`}/>
                    {errors.password && errors.password?.message && <span className="error-ryt">{errors.password.message}</span>}
                </div>
                <button className="btn-ryt btn-ryt--green mt-3"
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
