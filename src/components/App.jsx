import React from "react";
import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "../providers/auth";
import Timeline from "../pages/Timeline";
import UserPage from "../pages/UserPage";
import PostsByHashtag from "./PostsByHashtag";

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
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/hashtag/:hashtag" element={<PostsByHashtag />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.Fragment>
  );
}
