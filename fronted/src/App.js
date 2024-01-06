import React from 'react';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import LoginRegister from "./features/auth/components/LoginRegister";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginRegister/>}/>
    </Routes>   
  </BrowserRouter>
  );
}

export default App;
