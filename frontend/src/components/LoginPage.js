import React, { useState } from 'react';
import { TextField, Button, Typography, Tabs, Tab, Box, Paper } from '@mui/material';

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [userData, setUserData] = useState({ username: '', password: '', email: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = tabIndex === 0 ? 'login' : 'signup';
    
    const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    
    if (response.ok) {
      alert(result.message);
      if (endpoint === 'login') window.location.href = '/create-invoice';
      setUserData({ username: '', password: '', email: '' });
    } else {
      alert(result.error || 'Something went wrong!');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f4f4f4">
      <Paper elevation={3} style={{ padding: 30, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <Typography variant="h5" marginTop={2}>
          {tabIndex === 0 ? 'Login' : 'Sign Up'}
        </Typography>

        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          {tabIndex === 1 && (
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          )}
          <TextField
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
            {tabIndex === 0 ? 'Login' : 'Sign Up'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AuthPage;
