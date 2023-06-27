import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './App.scss';
import Header from "./components/Header";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home, {loader as usersLoader} from "./pages/Home";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header/>,
    children:[
      {
        index: true,
        element: <Home/>,
        loader: usersLoader
      },
      {
        path: '/register',
        element: <Register/>
      }
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
