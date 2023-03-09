import React from "react";
import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "../providers/auth";
import Timeline from "../pages/Timeline";

export default function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/sign-up" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.Fragment>
  );
}
