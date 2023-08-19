import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as usersLoader } from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddOffer from "./pages/AddOffer";
import {checkAuthLoader} from "./util/auth-loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: usersLoader,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "offers",
        loader: checkAuthLoader,
        children: [
          {
            path: "add",
            element: <AddOffer />
          },
          {
            path: ":id",
            loader: async ({params}) => {
              return fetch(`http://localhost:5000/offer/${params.id}`)
            },
            element: <AddOffer />
          },
        ]
      }
    ],
  },
]);
function App() {
  return <RouterProvider router={router} ></RouterProvider>;
}

export default App;
