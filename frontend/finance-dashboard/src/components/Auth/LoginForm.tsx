import React, { useState } from "react";
import { login } from "../../api/auth";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

interface Props {
  onLogin: () => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      onLogin();
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f6fa">
      <Paper elevation={3} sx={{ p: 4, minWidth: 320, maxWidth: 400 }}>
        <Typography variant="h5" mb={2} fontWeight={700}>Sign In</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error" mt={1}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Not registered?{" "}
            <Link component="button" onClick={() => navigate("/register")}>
              Create an account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;