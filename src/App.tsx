import './App.css';
import Header from './pages/Header.tsx';
import Home from './pages/Home.tsx';
import Cart from './pages/Cart.tsx'
import NotFound from './pages/NotFound.jsx';
import FullPizza from './pages/FullPizza.tsx';

import './scss/app.scss';
import React from 'react';
import { Routes,Route, Outlet } from "react-router-dom";



function App() {

  return (
    <div className="wrapper">
      
        <Header/>
        <div className="content">
              <Routes>
                <Route path = "/" element={<Home/>}/>
                <Route path = "/cart" element={<Cart/>}/>
                <Route path = "/pizza/:id" element={<FullPizza/>}/>
                <Route path = "*" element={<NotFound/>}/>


              </Routes>
        </div>
      
    </div>
  );
}

export default App;
