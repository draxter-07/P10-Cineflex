import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage.jsx"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import GlobalStyle from "./style/GlobalStyle.js"
import ResetStyle from "./style/ResetStyle.js"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

export default function App() {
    return (
        <>
            <ResetStyle/>
            <GlobalStyle/>
            <NavContainer>CINEFLEX</NavContainer>
            <BrowserRouter>
                <Routes>
                    <Route element={<HomePage />} path="/"/>
                    <Route element={<SeatsPage />} path="/assentos/:idFilme"/>
                    <Route element={<SessionsPage />} path="/sessoes/:idFilme"/>
                    <Route element={<SuccessPage />} path="/success/:idFilme"/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
