import React from 'react';
import GlobalStyle from '../styles/globalStyles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import { AuthProvider } from '../providers/auth';

export default function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.Fragment>
  );
}
