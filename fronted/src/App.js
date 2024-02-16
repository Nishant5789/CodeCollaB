import React from 'react';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import Protected from "./features/auth/components/Protected";

import Home from "./pages/Home"
import LoginRegister from "./features/auth/components/LoginRegister";
import Monaco from "./features/codeeditor/components/Monaco"
import Editor from './pages/Editor';
import ProfilePage from './features/Profile-Page/ProfilePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Auth" element={<LoginRegister/>}/>
      {/* <Route path="/" element={<Protected><Home/></Protected>}/> */}
      <Route path="/ProblemId" element={<Editor/>}/>
      <Route path ="/Profile" element={<ProfilePage/>}/>
    </Routes>   
  </BrowserRouter>
  );
}

export default App;
