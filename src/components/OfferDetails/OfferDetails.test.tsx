import React from 'react';
import {act, render, screen, waitFor} from '@testing-library/react';
import OfferDetails from './OfferDetails';
import {createMemoryRouter, RouterProvider} from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";


describe("test form apperance", () => {
    const FAKE_EVENT = {offer: undefined};
    const routes = [
        {
            path: "/offers/add",
            element: <OfferDetails/>,
            loader: () => FAKE_EVENT
        }
    ]
    const router = createMemoryRouter(routes, {
        initialEntries: ["/offers/add"]
    })

    test("title of page is rendering", async () => {
        render(<RouterProvider router={router}/>);
        const pageTitle = await waitFor(() => screen.getByText(/dodaj swoją ofertę/i));
        expect(pageTitle).toBeInTheDocument();
    })

    test("title of first paragraph is rendering", async () => {
        render(<RouterProvider router={router}/>);
        const pageTitle = await waitFor(() => screen.getByText(/uzupełnij swoje ogłoszenie/i));
        expect(pageTitle).toBeInTheDocument();
    })
    test("subtitle of first paragraph is rendering", async () => {
        render(<RouterProvider router={router}/>);
        const pageTitle = await waitFor(() => screen.getByText(/im lepiej wypełnisz swoje ogłoszenie, tym większa szansa na znalezienie ucznia!/i));
        expect(pageTitle).toBeInTheDocument();
    })
    test("title of second paragraph is rendering", async () => {
        render(<RouterProvider router={router}/>);
        const pageTitle = await waitFor(() => screen.getByText(/Informacje o lekcjach/i));
        expect(pageTitle).toBeInTheDocument();
    })
    test("subtitle of second paragraph is rendering", async () => {
        render(<RouterProvider router={router}/>);
        const pageTitle = await waitFor(() => screen.getByText(/upewnij się, że nazwa twojego przedmiotu jest poprawna. od tego zależy czy zostaniesz pokazany w filtrach/i));
        expect(pageTitle).toBeInTheDocument();
    })

    test("title of third paragraph is rendering", async () => {
        render(<RouterProvider router={router}/>);
        const pageTitle = await waitFor(() => screen.getByRole('heading', { name: /Dane kontaktowe/i}));
        expect(pageTitle).toBeInTheDocument();
    })
    test("subtitle of first paragraph is rendering", async () => {
        render(<RouterProvider router={router}/>);
        const pageTitle = await waitFor(() => screen.getByText(/podaj prawidłowe dane kontaktowe. nie chcemy, przecież głuchych telefonów/i));
        expect(pageTitle).toBeInTheDocument();
    })

    test("required info is rendering", async () => {
        render(<RouterProvider router={router}/>);
        const info = await waitFor(() => screen.getByText('* pola wymagane'));
        expect(info).toBeInTheDocument();
    })

    test("title input is rendered", async () => {
        render(<RouterProvider router={router}/>);
        const inputTitle = await waitFor(() => screen.getByLabelText("Tytuł*"));
        expect(inputTitle).toBeInTheDocument();
    })

    test("describe input is rendered", async () => {
        render(<RouterProvider router={router}/>);
        const inputDesc = await waitFor(() => screen.getByLabelText("Opis*"));
        expect(inputDesc).toBeInTheDocument();
    })

    test("theme input is rendered", async () => {
        render(<RouterProvider router={router}/>);
        const inputTheme = await waitFor(() => screen.getByLabelText("Przedmiot*"));
        expect(inputTheme).toBeInTheDocument();
    })

    test("price input is rendered", async () => {
        render(<RouterProvider router={router}/>);
        const inputPrice = await waitFor(() => screen.getByLabelText(/Cena*/));
        expect(inputPrice).toBeInTheDocument();
    })

    test("city input is rendered", async () => {
        render(<RouterProvider router={router}/>);
        const inputCity = await waitFor(() => screen.getByLabelText("Miasto*"));
        expect(inputCity).toBeInTheDocument();
    })

    test("email input is rendered", async () => {
        render(<RouterProvider router={router}/>);
        const inputEmail = await waitFor(() => screen.getByLabelText("E-mail*"));
        expect(inputEmail).toBeInTheDocument();
    })

    test("phone input is rendered", async () => {
        render(<RouterProvider router={router}/>);
        const inputPhone = await waitFor(() => screen.getByLabelText("Telefon"));
        expect(inputPhone).toBeInTheDocument();
    })
})

describe("test form add validation", () => {
    const initialSetup = async () => {
        let router
        let submitBtn: HTMLElement
        let inputTitle: HTMLElement
        let inputDesc: HTMLElement
        let inputTheme: HTMLElement
        let inputPrice: HTMLElement
        let inputCity: HTMLElement
        let inputEmail: HTMLElement
        let inputPhone: HTMLElement
        const mockData = { foo: 'bar' };
        global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => mockData })
        const FAKE_EVENT = {offer: undefined};
        const routes = [
            {
                path: "/offers/add",
                element: <OfferDetails/>,
                loader: () => FAKE_EVENT
            }
        ]
        router = createMemoryRouter(routes, {
            initialEntries: ["/offers/add"]
        })
        render(<RouterProvider router={router}/>);

        [submitBtn, inputTitle, inputDesc, inputTheme, inputPrice, inputCity, inputEmail, inputPhone] = await Promise.all([
            waitFor(() => screen.getByRole("button", {name: /dodaj ogłoszenie/i})),
            waitFor(() => screen.getByLabelText('Tytuł*')),
            waitFor(() => screen.getByLabelText('Opis*')),
            waitFor(() => screen.getByLabelText('Przedmiot*')),
            waitFor(() => screen.getByLabelText(/Cena/i)),
            waitFor(() => screen.getByLabelText('Miasto*')),
            waitFor(() => screen.getByLabelText('E-mail*')),
            waitFor(() => screen.getByLabelText('Telefon')),
        ]);

        userEvent.type(inputTitle, "Testowy tytuł")
        userEvent.type(inputDesc, "Testowy 123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890")
        userEvent.type(inputTheme, "Testowy przedmiot")
        userEvent.type(inputPrice, "32")
        userEvent.type(inputCity, "Testoland")
        userEvent.type(inputEmail, "test@gmail.com")
        userEvent.type(inputPhone, "606 606 606")

        return {
            submitBtn, inputTitle, inputDesc, inputTheme, inputPrice, inputCity, inputEmail, inputPhone
        };
    }

    test("form is fully filled", async () => {
        const {submitBtn} = await initialSetup();
        userEvent.click(submitBtn)
        await waitFor( () => expect(global.fetch).toBeCalledTimes(1))
    })

    test("title input is empty validation", async () => {
        const {submitBtn, inputTitle} = await initialSetup();
        userEvent.clear(inputTitle)
        userEvent.click(submitBtn)
        expect(global.fetch).toBeCalledTimes(0)
    })



})
