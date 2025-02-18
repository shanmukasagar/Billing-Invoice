import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const InvoiceForm = () => {
  const [transactionType, setTransactionType] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    supplierCustomerId: '',
    transactionNumber: '',
    productServiceName: '',
    quantity: '',
    unitPrice: '',
    totalAmount: 0,
    tax: 0,
    advancePaid: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make POST request to backend API to create the invoice
    const response = await fetch('http://localhost:5000/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert('Invoice Created');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Transaction Type</InputLabel>
        <Select
          label="Transaction Type"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          fullWidth
        >
          <MenuItem value="Purchase">Purchase</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="Supplier/Customer ID"
        name="supplierCustomerId"
        value={formData.supplierCustomerId}
        onChange={handleInputChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Transaction Number"
        name="transactionNumber"
        value={formData.transactionNumber}
        onChange={handleInputChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Product/Service Name"
        name="productServiceName"
        value={formData.productServiceName}
        onChange={handleInputChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Quantity"
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleInputChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Unit Price"
        type="number"
        name="unitPrice"
        value={formData.unitPrice}
        onChange={handleInputChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Total Amount"
        type="number"
        value={formData.totalAmount}
        fullWidth
        margin="normal"
        disabled
      />

      <TextField
        label="Tax"
        type="number"
        name="tax"
        value={formData.tax}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Advance Paid"
        type="number"
        name="advancePaid"
        value={formData.advancePaid}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary">Create Invoice</Button>
    </form>
  );
};

export default InvoiceForm;
