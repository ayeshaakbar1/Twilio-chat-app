import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from './components/WelcomeScreen';
import ChatScreen from './components/ChatScreen';
import RequireToken from './utils/RequireToken';
function App() {
  return (
    <BrowserRouter>
    <Routes> 
     
    <Route path="/" element={<WelcomeScreen/>} />
     {/* We are using the RequireToken component to check if the user is logged in or not */}
    <Route path="/chat" element={<RequireToken><ChatScreen/></RequireToken>} />
  
    </Routes>
    </BrowserRouter>
  );
}

export default App;
