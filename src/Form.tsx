import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';
import SubmitIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';

const FormPage: React.FC = () => {
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [error, setError] = useState('');
const [showSuccess, setShowSuccess] = useState(false);
const [showError, setShowError] = useState(false);
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
    setShowError(true);
    return 
    }
    const userDetails = { name, phone, email };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    setShowSuccess(true);
    setTimeout(() => {
        navigate('/second-page');
    }, 500);
};

return (
    <Container maxWidth="sm" style={{textAlign: 'center'}}>
    <Typography variant="h3" component="h1" gutterBottom>
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
    <Button variant="contained" color="primary" onClick={handleSubmit} endIcon={<SubmitIcon />}>
        Submit
    </Button>
    {showError && (
        <Alert severity="error">Enter your detail before accessing the page.</Alert>
    )}
    {showSuccess && (
        <Alert severity="success">Data submitted successfully.</Alert>
    )}
    </Container>
);
};

export default FormPage;
