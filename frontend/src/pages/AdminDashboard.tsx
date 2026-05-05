import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, Stack, Typography, CircularProgress, alpha, Avatar, Chip } from '@mui/material';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const backendAdminUrl = import.meta.env.VITE_ADMIN_PANEL_URL || 'http://localhost:8082/admin';

  useEffect(() => {
    if (!sessionStorage.getItem('isAdmin')) {
      navigate('/admin/login');
      return;
    }

    const timer = window.setTimeout(() => {
      window.location.assign(backendAdminUrl);
    }, 650);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fbf8f5' }}>
      <Container maxWidth="sm">
        <Card sx={{ p: { xs: 3, sm: 4 }, borderRadius: 6, border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 20px 50px rgba(36,48,71,0.08)', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main', width: 72, height: 72, boxShadow: '0 12px 24px rgba(255,138,101,0.22)' }}>
              <AdminPanelSettingsIcon sx={{ fontSize: 36 }} />
            </Avatar>
            <Chip label="Redirecting to backend admin" sx={{ bgcolor: alpha('#49c5b6', 0.14), color: '#22756f', fontWeight: 800 }} />
            <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.05 }}>
              Opening the real admin page
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              The frontend admin route now hands off to the backend admin panel so there is only one admin page to manage.
            </Typography>
            <CircularProgress />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
              If it doesn’t open automatically, click below.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button
                variant="contained"
                component="a"
                href={backendAdminUrl}
                startIcon={<LaunchOutlinedIcon />}
                sx={{ px: 3 }}
              >
                Open Backend Admin
              </Button>
              <Button variant="outlined" onClick={handleLogout} startIcon={<LogoutIcon />}>
                Logout
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
