import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Button, Card, Container, Divider, Grid, Stack, Typography, alpha,
  TextField, CircularProgress, Alert
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dayjs, { Dayjs } from 'dayjs';
import { useAuth } from '../AuthContext';
import { PetListing } from '../data';
import { bustImageCache } from '../utils';

interface CartItem extends PetListing { quantity: number; }

export default function CheckoutPage({ 
  cart, 
  onClear 
}: { 
  cart: CartItem[]; 
  onClear: () => void;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scheduledDate, setScheduledDate] = useState<Dayjs | null>(dayjs().add(1, 'day'));
  const [scheduledTime, setScheduledTime] = useState<Dayjs | null>(dayjs().set('hour', 10).set('minute', 0));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0 && !success) {
      navigate('/cart');
    }
  }, [cart, navigate, success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError('');

    try {
      const dateTime = scheduledDate?.hour(scheduledTime?.hour() || 0).minute(scheduledTime?.minute() || 0);
      
      const res = await fetch('/api/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: user.email,
          customerName: user.displayName || user.email,
          scheduledDate: dateTime?.toISOString(),
          totalAmount: total,
          cartItems: cart.map(item => ({ id: item.id, quantity: item.quantity }))
        })
      });

      if (res.ok) {
        setSuccess(true);
        onClear();
      } else {
        setError('Failed to process adoption. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(255,138,101,0.08), rgba(73,197,182,0.10))' }}>
        <Container maxWidth="sm">
          <Card sx={{ p: 5, textAlign: 'center', borderRadius: 8, boxShadow: '0 32px 80px rgba(36,48,71,0.12)' }}>
            <CheckCircleIcon sx={{ fontSize: 100, color: 'success.main', mb: 3 }} />
            <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>Adoption Requested! 🎉</Typography>
            <Typography color="text.secondary" variant="h6" sx={{ mb: 4 }}>
              We've received your request to take these cuties home. We'll contact you soon to confirm your pickup/delivery for {scheduledDate?.format('MMMM D, YYYY')} at {scheduledTime?.format('h:mm A')}.
            </Typography>
            <Button variant="contained" size="large" component={Link} to="/" sx={{ borderRadius: 999, px: 4 }}>
              Back to Store
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6 }}>
        <Container maxWidth="lg">
          <Button component={Link} to="/cart" startIcon={<ArrowBackIcon />} sx={{ mb: 4, color: 'text.secondary' }}>
            Back to Cart
          </Button>

          <Typography variant="h3" fontWeight={900} sx={{ mb: 5 }}>Complete Adoption 🏡</Typography>

          <Grid container spacing={5}>
            <Grid item xs={12} md={7}>
              <Card sx={{ p: 4, borderRadius: 6, border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 16px 40px rgba(36,48,71,0.08)' }}>
                <Typography variant="h5" fontWeight={900} sx={{ mb: 4 }}>Schedule Your Meeting</Typography>
                
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <Alert severity="info" sx={{ borderRadius: 3 }}>
                      Choose a time when you'll be ready to welcome your new family member!
                    </Alert>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                      <DatePicker
                        label="Preferred Date"
                        value={scheduledDate}
                        onChange={(newValue) => setScheduledDate(newValue)}
                        disablePast
                        sx={{ flex: 1 }}
                      />
                      <TimePicker
                        label="Preferred Time"
                        value={scheduledTime}
                        onChange={(newValue) => setScheduledTime(newValue)}
                        sx={{ flex: 1 }}
                      />
                    </Stack>

                    <Divider />

                    <Typography variant="h6" fontWeight={900}>Your Information</Typography>
                    <Stack spacing={2.5}>
                      <TextField label="Full Name" value={user?.displayName || ''} disabled fullWidth />
                      <TextField label="Email Address" value={user?.email || ''} disabled fullWidth />
                    </Stack>

                    {error && <Typography color="error" fontWeight={800}>{error}</Typography>}

                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large" 
                      disabled={loading}
                      sx={{ py: 2, borderRadius: 999, fontSize: '1.1rem', fontWeight: 900 }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Adoption & Schedule 🐾'}
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card sx={{ p: 4, borderRadius: 6, bgcolor: alpha('#ffffff', 0.5), border: '1px solid rgba(36,48,71,0.08)' }}>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 3 }}>Pets You're Adopting</Typography>
                <Stack spacing={2}>
                  {cart.map(item => (
                    <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                      <Box sx={{ width: 60, height: 60, borderRadius: 2, overflow: 'hidden', bgcolor: 'primary.light' }}>
                        <img src={bustImageCache(item.images?.[0] || '')} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={800}>{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.species} · {item.breed}</Typography>
                      </Box>
                      <Typography fontWeight={900}>${item.price}</Typography>
                    </Stack>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6" fontWeight={900}>Total Amount</Typography>
                    <Typography variant="h5" fontWeight={900} color="primary.main">${total.toFixed(2)}</Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LocalizationProvider>
  );
}
