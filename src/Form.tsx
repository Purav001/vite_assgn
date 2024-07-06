import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';

const FormPage: React.FC = () => {
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();
const location = useLocation();

useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('error')) {
    setError('You must enter your details before accessing the second page.');
    }
}, [location]);

const handleSubmit = () => {
    if (!name || !phone || !email) {
    setError('All fields are required');
    return;
    }
    const userDetails = { name, phone, email };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    navigate('/second-page');
};

return (
    <Container maxWidth="sm">
    <Typography variant="h4" component="h1" gutterBottom>
        User Information
    </Typography>
    {error && <Typography color="error">{error}</Typography>}
    <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
    />
    <TextField
        fullWidth
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        margin="normal"
    />
    <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
    />
    <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
    </Button>
    </Container>
);
};

export default FormPage;
