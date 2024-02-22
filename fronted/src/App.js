import React from 'react';
import './App.css';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import LoginRegister from "./features/auth/components/LoginRegister";
import ProblemPage from './pages/ProblemPage';
import Realtime from './features/realtimeeditor/Realtime';
import Roomeditor from './features/realtimeeditor/components/Roomeditor';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/:ProblemId" element={<ProblemPage/>}/>
      <Route path="/Auth" element={<LoginRegister/>}/>
      <Route path="/realtimeIDE" element={<Realtime/>}/>
      <Route path="/realtimeditor/:roomId" element={<Roomeditor/>}/>
    </Routes>   
  </BrowserRouter>
  );
}

export default App;
