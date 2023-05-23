import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage.jsx';
import SeatsPage from './pages/SeatsPage/SeatsPage.jsx';
import SessionsPage from './pages/SessionsPage/SessionsPage.jsx';
import SuccessPage from './pages/SuccessPage/SuccessPage.jsx';

export default function Routes(){
    return(
        <BrowserRouter>
             <Route component={HomePage} path="/"/>
        </BrowserRouter>
    )
}