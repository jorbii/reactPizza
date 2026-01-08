import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, } from "react-router-dom";
import { store } from './Redux/store.ts'
import { Provider } from 'react-redux'

import App from './App.tsx';


const rootElem = document.getElementById('root')

if (rootElem) {

    const root = ReactDOM.createRoot(rootElem);

    root.render(
        <Provider store ={store}>
            <BrowserRouter basename='/'>
                <App />
            </BrowserRouter>
        </Provider>
);

};

