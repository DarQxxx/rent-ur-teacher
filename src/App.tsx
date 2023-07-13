import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as usersLoader } from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddOffer from "./pages/AddOffer";

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
        path: "offer",
        children: [
          {
            path: "add",
            element: <AddOffer />
          },
        ]
      }
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
