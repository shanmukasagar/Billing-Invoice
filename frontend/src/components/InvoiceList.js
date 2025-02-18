import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await fetch('http://localhost:5000/api/invoices');
      const data = await response.json();
      setInvoices(data);
    };
    fetchInvoices();
  }, []);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction Number</TableCell>
            <TableCell>Supplier/Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice._id}>
              <TableCell>{invoice.transactionNumber}</TableCell>
              <TableCell>{invoice.supplierCustomerId}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.totalAmount}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                <Button variant="outlined">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceList;
