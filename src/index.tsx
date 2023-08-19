import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {AuthContextProvider} from "./context/store/auth-context";
import {ToastContextProvider} from "./context/store/toast-context";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContextProvider>
      <ToastContextProvider>
          <App />
      </ToastContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
