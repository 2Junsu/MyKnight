import React from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindTreasure from "./pages/FindTreasure";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalStyle from "./style/global";

const App = () => {
  return (
    <>
      <CookiesProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/treasure" element={<FindTreasure />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  );
};

export default App;
