import React, { useState } from "react";

const useValidate = (type: string) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    `Pole ${type} nie może być puste`
  );
  const [value, setValue] = useState<any>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    switch (type.toLowerCase()) {
      case "email":
        if (e.target.value.trim().includes("@")) return setIsValid(true);
        else {
          setErrorMessage("Podany email jest nieprawidłowy");
          setIsValid(false);
        }
        return;
      case "name":
        if (e.target.value.trim().length >= 3) setIsValid(true);
        else {
          setErrorMessage("Podane imię jest nieprawidłowe");
          setIsValid(false);
        }
        return;
      case "password":
        if (e.target.value.trim().length >= 6) return setIsValid(true);
        else {
          setErrorMessage("Hasło powinno zawierać przynajmniej 6 znaków");
          setIsValid(false);
        }
        return;
      default:
        return;
    }
  };

  const isError = !isValid && isTouched;
  return { isValid, isError, errorMessage, blurHandler, changeHandler, value, setIsTouched};
};

export default useValidate;
