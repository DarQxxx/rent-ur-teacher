import React, {useContext} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import './OfferDetails.scss'
import useFetch from "../hooks/useFetch";
import AuthContext from "../context/store/auth-context";
import {useNavigate} from "react-router-dom";

type OfferInputs = {
    title: string,
    theme: string,
    description: string,
    price: number,
    city: number | string,
    email: string,
    telephone: string

};
const OfferDetails: React.FC = () => {
    const authFetch = useFetch();
    const ctx = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<OfferInputs>({
        mode: "onTouched"
    });
    const onSubmit: SubmitHandler<OfferInputs> = data => {
        authFetch(`http://localhost:5000/offer/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${ctx.loginToken}`
            },
            data: {...data, token: ctx.loginToken},
        }).then(r => {
            if (r.success) {
                // navigate("/offers", {replace: true});
            } else {
                console.log(r.result)
            }
        });
    };
    return (
        <div className="container mb-3">
            <div className="row">
                <h1 className="font--32 fw-bolder mb-4">Dodaj swoją ofertę</h1>
            </div>
            <form className="offer-form d-flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column offer-form--segment p-md-4 pe-2 ps-2 pt-4 pb-4 gap-md-4 gap-3">
                    <div>
                        <h2 className="font--20 fw-bold line-height--22 mb-2">Uzupełnij swoje ogłoszenie</h2>
                        <p className="font--14 line-height--20 mb-0">Im lepiej wypełnisz swoje ogłoszenie, tym większa szansa na znalezienie ucznia!</p>
                    </div>
                    <div className="d-flex flex-column">
                        <label className={`label-ryt ${errors.title && "label-ryt--error"}`} htmlFor="title">Tytuł*</label>
                        <textarea id="input_title" placeholder="np. Najlepsze korepetycje z angielskiego tylko u Kowalskiego!" {...register("title", { required: {value: true, message: "Pole tytuł nie może być puste"}, maxLength: {value: 75, message: "Tytuł nie może być dłuższy niż 75 znaków"}})} name="title" className={`input-ryt ${errors.title && "input-ryt--error"}`}/>
                        {errors.title && errors.title?.message && <span className="error-ryt">{errors.title.message}</span>}
                    </div>
                    <div className="d-flex flex-column">
                        <label className={`label-ryt ${errors.description && "label-ryt--error"}`} htmlFor="description">Opis*</label>
                        <textarea id="input_description" placeholder="np. Korepetycje u emerytowanego nauczyciela angielskiego pochodzenia. Mój angielski jest na poziomie C2 (native). Uczyłem ponad setki maturzystów..." {...register("description", { required: {value: true, message: "Pole opis nie może być puste"}, minLength: {value: 150, message: "Opis musi zawierać co najmniej 150 znaków"}})} name="description" className={`input-ryt ${errors.description && "input-ryt--error"}`}/>
                        {errors.description && errors.description?.message && <span className="error-ryt">{errors.description.message}</span>}
                    </div>
                </div>
                <div className="d-flex flex-column offer-form--segment p-md-4 pe-2 ps-2 pt-4 pb-4 gap-md-4 gap-3">
                    <div>
                        <h2 className="font--20 fw-bold line-height--22 mb-2">Informacje o lekcjach</h2>
                        <p className="font--14 line-height--20 mb-0">Upewnij się, że nazwa Twojego przedmiotu jest poprawna. Od tego zależy czy zostaniesz pokazany w filtrach</p>
                    </div>
                    <div className="d-flex flex-column">
                        <label className={`label-ryt ${errors.theme && "label-ryt--error"}`} htmlFor="price">Przedmiot*</label>
                        <input id="input_theme" type="text" placeholder="np. Angielski" {...register("theme", { required: {value: true, message: "Pole przedmiot nie może być puste"}})} name="theme" className={`input-ryt ${errors.theme && "input-ryt--error"}`}/>
                        {errors.theme && errors.theme?.message && <span className="error-ryt">{errors.theme.message}</span>}
                    </div>
                    <div className="d-flex flex-column">
                        <label className={`label-ryt ${errors.price && "label-ryt--error"}`} htmlFor="price">Cena* <span className="font--10">(PLN)/45 min lekcji</span></label>
                        <input id="input_price" type="number" min='0' placeholder="30" {...register("price", { required: {value: true, message: "Pole cena nie może być puste"}, min: {value: 0, message: "Cena nie może być mniejsza niż 0"}})} name="price" className={`input-ryt ${errors.price && "input-ryt--error"}`}/>
                        {errors.price && errors.price?.message && <span className="error-ryt">{errors.price.message}</span>}
                    </div>
                    <div className="d-flex flex-column">
                        <label className={`label-ryt ${errors.city && "label-ryt--error"}`} htmlFor="city">Miasto*</label>
                        <input id="input_city" type="text" placeholder="np. Warszawa" {...register("city", { required: {value: true, message: "Pole miasto nie może być puste"}})} name="city" className={`input-ryt ${errors.city && "input-ryt--error"}`}/>
                        {errors.city && errors.city?.message && <span className="error-ryt">{errors.city.message}</span>}
                    </div>
                </div>
                <div className="d-flex flex-column offer-form--segment p-md-4 pe-2 ps-2 pt-4 pb-4 gap-md-4 gap-3">
                    <div>
                        <h2 className="font--20 fw-bold line-height--22 mb-2">Dane kontaktowe</h2>
                        <p className="font--14 line-height--20 mb-0">Podaj prawidłowe dane kontaktowe. Nie chcemy, przecież głuchych telefonów</p>
                    </div>
                    <div className="d-flex flex-column">
                        <label className={`label-ryt ${errors.email && "label-ryt--error"}`} htmlFor="email">Email*</label>
                        <input id="input_email" type="email" placeholder="np. zygmunt.kowalski@domain.com" {...register("email", { required: {value: true, message: "Pole email nie może być puste"}, pattern: {value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i, message: "Podany email jest nieprawidłowy"}})} name="email" className={`input-ryt ${errors.email && "input-ryt--error"}`}/>
                        {errors.email && errors.email?.message && <span className="error-ryt">{errors.email.message}</span>}
                    </div>
                    <div className="d-flex flex-column">
                        <label className={`label-ryt ${errors.telephone && "label-ryt--error"}`} htmlFor="price">Telefon</label>
                        <input id="input_telephone" type="text" placeholder="np. 606733128" {...register("telephone", {pattern: {value: /^(?:[0-9]{9}|[0-9]{3} [0-9]{3} [0-9]{3}|[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2})$/, message: "Podany numer jest nieprawidłowy"}})} name="telephone" className={`input-ryt ${errors.telephone && "input-ryt--error"}`}/>
                        {errors.telephone && errors.telephone?.message && <span className="error-ryt">{errors.telephone.message}</span>}
                    </div>
                    <p className="mb-0 font--10">* pola wymagane</p>
                </div>
                <div className="w-100 d-flex  ps-md-4 pd-md-4 pe-2 ps-2">
                    <button className="btn-ryt btn-ryt--green btn-ryt--width mt-4"
                            type="submit">Dodaj ogłoszenie</button>
                </div>

            </form>
        </div>
    );
}

export default OfferDetails;
