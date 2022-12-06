import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/context';
import { Auth0Provider } from "@auth0/auth0-react";

//dev-onmiied5f0smy5ru.us.auth0.com
//uKaSOoKagxf1MniQUydJeEweYzyFqNHc

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider >
    <Auth0Provider
    domain="dev-onmiied5f0smy5ru.us.auth0.com"
    clientId="uKaSOoKagxf1MniQUydJeEweYzyFqNHc"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>
    </AppProvider>
  </React.StrictMode>
);