import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Avatar } from "@mui/material";
import { register } from "../../api/auth";

interface Props {
  onRegister: () => void;
}

const RegisterForm: React.FC<Props> = ({ onRegister }) => {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    avatar: null as File | null,
  });
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, avatar: file });
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("fullname", form.fullname);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (form.avatar) formData.append("avatar", form.avatar);

      await register(formData);
      onRegister();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f6fa">
      <Paper elevation={3} sx={{ p: 2, minWidth: 280, maxWidth: 420 }}>
        <Typography variant="h6" mb={1.5} fontWeight={700} align="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Full Name"
            name="fullname"
            fullWidth
            size="small"
            margin="dense"
            value={form.fullname}
            onChange={handleChange}
            required
          />
          <TextField
            label="Username"
            name="username"
            fullWidth
            size="small"
            margin="dense"
            value={form.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            size="small"
            margin="dense"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            size="small"
            margin="dense"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 1, mb: 1, fontSize: 13, py: 1 }}
          >
            Upload Avatar
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {preview && (
            <Box display="flex" justifyContent="center" mb={1}>
              <Avatar src={preview} sx={{ width: 40, height: 40 }} />
            </Box>
          )}
          {error && <Typography color="error" mt={1} fontSize={13}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1, fontSize: 14, py: 1 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;