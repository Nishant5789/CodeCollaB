import React from 'react';
import './App.css';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import LoginRegister from "./features/auth/components/LoginRegister";
import Monaco from "./features/codeeditor/components/Monaco"
import Editor from './pages/Editor';
import ProfilePage from './features/Profile-Page/ProfilePage';
import ProblemPage from './pages/ProblemPage';
import Realtime from './features/realtimeeditor/Realtime';
import Roomeditor from './features/realtimeeditor/components/Roomeditor';
import Protected from './features/auth/components/Protected';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Protected><Home/></Protected> }/>
      <Route path="/:ProblemId" element={<Protected><ProblemPage/></Protected> }/>
      <Route path="/Auth" element={<LoginRegister/>}/>
      {/* <Route path="/" element={<Protected><Home/></Protected>}/> */}
      <Route path="/ProblemId" element={<Editor/>}/>
      <Route path ="/Profile" element={<ProfilePage/>}/>
      <Route path="/realtimeIDE" element={<Protected><Realtime/></Protected> }/>
      <Route path="/realtimeditor/:roomId" element={<Protected><Roomeditor/></Protected>}/>
    </Routes>   
  </BrowserRouter>
  );
}

export default App;
