import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./sass/_main.scss";


import LoginPage from './components/LoginPage';
import HomePage from './components/Home';
import CreateInvoice from "./components/CreateInvoice";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-invoice" element={<CreateInvoice />} />
      </Routes>
    </Router>
  );
}

export default App;
