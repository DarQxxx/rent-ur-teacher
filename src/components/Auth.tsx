import React from "react";
import useValidate from "../hooks/useValidate";
import useFetch from "../hooks/useFetch";
import "./Auth.scss";

const AuthForm: React.FC<{ action: string }> = (props) => {
  const name = useValidate("name");
  const email = useValidate("email");
  const password = useValidate("password");
  const authFetch = useFetch();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (email.isValid && password.isValid) {
      props.action === "login"
        ? authFetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: {
              name: name.value,
              email: email.value,
              password: password.value,
            },
          })
        : name.isValid &&
          authFetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: {
              name: name.value,
              email: email.value,
              password: password.value,
            },
          });
    }
  };
  return (
    <div className="flex-grow-1 d-flex align-items-center justify-content-center">
      <form onSubmit={submitHandler} className="d-flex flex-column auth">
        <label
          htmlFor="email"
          className={`label-ryt ${email.isError && "label-ryt--error"}`}
        >
          Email
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
            className={`label-ryt ${name.isError && "label-ryt--error"}`}
          >
            Name
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
          className={`label-ryt ${password.isError && "label-ryt--error"}`}
        >
          Paswd
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
        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  );
};

export default AuthForm;
