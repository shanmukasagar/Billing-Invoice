import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-invoice" element={<InvoiceForm />} />
        <Route path="/view-invoices" element={<InvoiceList />} />
      </Routes>
    </Router>
  );
}

export default App;
