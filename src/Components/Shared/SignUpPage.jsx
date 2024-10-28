import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Avatar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { CameraAlt } from '@mui/icons-material';
import { useAuth } from '../../Context/AllContext';

const SignUpPage = () => {
  const { signupUser } = useAuth();
  const [Name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Address, setAddress] = useState('');
  const [Country, setCountry] = useState('');
  const [State, setState] = useState('');
  const [error, setError] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    signupUser({
      Name, username, Email, password, Address, Country, State, Avatar: avatarFile
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarFile(reader.result);
        setAvatarPreview(reader.result); // Set base64 data URL for preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 1,
          p: 2,
          boxShadow: 3,
          bgcolor:"#fff"
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Sign Up
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        {/* Avatar Upload Section */}
        <Box sx={{ position: 'relative', mb: 3 }}>
          <label htmlFor="avatar-upload">
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <IconButton component="span" sx={{ p: 0 }}>
              {avatarPreview ? (
                <Avatar
                  src={avatarPreview}
                  alt="Avatar Preview"
                  sx={{
                    width: 120,
                    height: 120,
                    boxShadow: 2,
                    border: '2px solid #eee',
                    cursor: 'pointer',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: '#f0f0f0',
                    boxShadow: 2,
                    cursor: 'pointer',
                  }}
                >
                  <CameraAlt sx={{ color: '#888', fontSize: '2.5rem' }} />
                </Box>
              )}
            </IconButton>
          </label>
        </Box>

        {/* Form Fields */}
        <form onSubmit={handleSignUp} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Country"
            value={Country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="State"
            value={State}
            onChange={(e) => setState(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Typography variant="body2" align="center">
            Already have an account? <Link to="/login">Log In</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;
