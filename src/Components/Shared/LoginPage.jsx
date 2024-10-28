import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AllContext';


const LoginPage = () => {
  const {loginUser} = useAuth()
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({Email , password})
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          padding: 3,
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="Email"
            autoFocus
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Typography variant="body2" align="center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
