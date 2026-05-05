import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Button, Card, CircularProgress, Container, IconButton,
  InputAdornment, Stack, TextField, Typography, alpha,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const backendAdminUrl = import.meta.env.VITE_ADMIN_PANEL_URL || 'http://localhost:8082/admin';
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('logout') === '1') {
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('isAdmin');
      setNotice('You have been logged out successfully.');
    }
  }, [location.search]);

  const setField = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('adminToken', data.token);
        sessionStorage.setItem('isAdmin', 'true');
        window.location.assign(backendAdminUrl);
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch {
      setError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(255,138,101,0.08), rgba(73,197,182,0.10))', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Container maxWidth="sm">
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 3, color: '#ff8a65', fontWeight: 800 }}>
          Back to Store
        </Button>

        <Card sx={{ borderRadius: 8, overflow: 'visible', border: '2px solid rgba(255,138,101,0.15)', boxShadow: '0 32px 80px rgba(255,138,101,0.14)', p: { xs: 3, sm: 5 } }}>
          {notice && (
            <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, bgcolor: alpha('#49c5b6', 0.10), border: '1px solid rgba(73,197,182,0.25)' }}>
              <Typography variant="body2" color="success.main" fontWeight={800} align="center">
                {notice}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: alpha('#ff8a65', 0.15), border: '2px solid rgba(255,138,101,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AdminPanelSettingsIcon sx={{ fontSize: 40, color: '#ff8a65' }} />
            </Box>
          </Box>

          <Typography variant="h4" align="center" fontWeight={900} sx={{ mb: 0.5, color: '#243047' }}>
            Admin Portal
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
            MyPetStore — Restricted access to the backend admin tools
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Username"
                required
                autoComplete="username"
                value={form.username}
                onChange={setField('username')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#ff8a65' }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
              />

              <TextField
                label="Password"
                required
                autoComplete="current-password"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={setField('password')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: '#ff8a65' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(v => !v)} edge="end" sx={{ color: '#ff8a65' }}>
                        {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
              />

              {error && (
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha('#ef5350', 0.12), border: '1px solid rgba(239,83,80,0.3)' }}>
                  <Typography variant="body2" color="error" fontWeight={800} align="center">{error}</Typography>
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ borderRadius: 999, py: 1.6, fontWeight: 900, fontSize: '1rem', boxShadow: '0 12px 28px rgba(255,138,101,0.3)', '&:hover': { boxShadow: '0 16px 36px rgba(255,138,101,0.4)' } }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In to Admin'}
              </Button>
            </Stack>
          </Box>

          <Box sx={{ mt: 4, p: 2, borderRadius: 3, bgcolor: alpha('#49c5b6', 0.08), border: '1px solid rgba(73,197,182,0.2)', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#49c5b6', fontWeight: 900, display: 'block', mb: 0.5 }}>
              Demo Credentials
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={800}>
              Username: <span style={{ color: '#243047' }}>admin</span> &nbsp;|&nbsp;
              Password: <span style={{ color: '#243047' }}>admin123</span>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.2 }}>
              After sign-in, you’ll land on a clean admin launcher with a button that opens the backend panel at {backendAdminUrl}.
            </Typography>
          </Box>

          <Typography variant="caption" align="center" display="block" sx={{ mt: 3, color: 'text.secondary' }}>
            Not an admin? <Link to="/login" style={{ color: '#ff8a65', fontWeight: 800 }}>Customer Login</Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 4,
    '&:hover fieldset': { borderColor: '#ff8a65' },
    '&.Mui-focused fieldset': { borderColor: '#ff8a65' },
  },
  '& label.Mui-focused': { color: '#ff8a65' },
};
