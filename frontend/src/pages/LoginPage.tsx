import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Button, Card, Container, Divider, IconButton, InputAdornment,
  Stack, TextField, Typography, alpha, CircularProgress,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider, isFirebaseConfigured } from '../config/firebaseConfig';

// ── Cute paw SVG illustration ─────────────────────────────────────────────────
function CutePawIllustration() {
  return (
    <Box sx={{ position: 'relative', mx: 'auto', width: 180, height: 180 }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Body */}
        <ellipse cx="100" cy="130" rx="55" ry="48" fill="#ff8a65" opacity="0.9"/>
        {/* Head */}
        <circle cx="100" cy="78" r="42" fill="#ffb74d"/>
        {/* Ears */}
        <ellipse cx="66" cy="48" rx="18" ry="22" fill="#ff8a65" transform="rotate(-15 66 48)"/>
        <ellipse cx="134" cy="48" rx="18" ry="22" fill="#ff8a65" transform="rotate(15 134 48)"/>
        <ellipse cx="66" cy="48" rx="10" ry="14" fill="#ffccbc" transform="rotate(-15 66 48)"/>
        <ellipse cx="134" cy="48" rx="10" ry="14" fill="#ffccbc" transform="rotate(15 134 48)"/>
        {/* Eyes */}
        <circle cx="86" cy="76" r="8" fill="#243047"/>
        <circle cx="114" cy="76" r="8" fill="#243047"/>
        <circle cx="89" cy="73" r="3" fill="white"/>
        <circle cx="117" cy="73" r="3" fill="white"/>
        {/* Nose */}
        <ellipse cx="100" cy="89" rx="6" ry="4" fill="#e64a19"/>
        {/* Mouth */}
        <path d="M94 93 Q100 100 106 93" stroke="#e64a19" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Whiskers */}
        <line x1="60" y1="88" x2="90" y2="91" stroke="#795548" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="60" y1="94" x2="90" y2="93" stroke="#795548" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="140" y1="88" x2="110" y2="91" stroke="#795548" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="140" y1="94" x2="110" y2="93" stroke="#795548" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Paws */}
        <ellipse cx="60" cy="158" rx="18" ry="13" fill="#ffb74d"/>
        <ellipse cx="140" cy="158" rx="18" ry="13" fill="#ffb74d"/>
        <circle cx="52" cy="152" r="5" fill="#ff8a65"/>
        <circle cx="61" cy="149" r="5" fill="#ff8a65"/>
        <circle cx="70" cy="152" r="5" fill="#ff8a65"/>
        <circle cx="130" cy="152" r="5" fill="#ff8a65"/>
        <circle cx="139" cy="149" r="5" fill="#ff8a65"/>
        <circle cx="148" cy="152" r="5" fill="#ff8a65"/>
        {/* Heart */}
        <path d="M97 57 Q100 53 103 57 Q107 52 110 57 Q110 62 100 68 Q90 62 90 57 Q93 52 97 57Z" fill="#ef5350" opacity="0.9"/>
      </svg>
      {/* Floating paw prints */}
      {[{ x: -24, y: 40, r: 0 }, { x: 192, y: 60, r: 15 }, { x: 168, y: 170, r: -10 }].map((pos, i) => (
        <Box key={i} sx={{ position: 'absolute', left: pos.x, top: pos.y, transform: `rotate(${pos.r}deg)`, opacity: 0.35 }}>
          <svg width="28" height="28" viewBox="0 0 40 40">
            <circle cx="14" cy="10" r="6" fill="#ff8a65"/>
            <circle cx="26" cy="10" r="6" fill="#ff8a65"/>
            <circle cx="8" cy="20" r="5" fill="#ff8a65"/>
            <circle cx="32" cy="20" r="5" fill="#ff8a65"/>
            <ellipse cx="20" cy="30" rx="12" ry="9" fill="#ff8a65"/>
          </svg>
        </Box>
      ))}
    </Box>
  );
}

// ── Google & Facebook button SVGs ─────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

type Mode = 'login' | 'register' | 'phone';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const [mode, setMode] = useState<Mode>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });

  const firebaseUnavailableMessage = 'Firebase is not configured yet. Add your real Vite env values in frontend/.env to enable login.';

  const setField = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSocialLogin = async (provider: any) => {
    setError('');
    if (!auth) {
      setError(firebaseUnavailableMessage);
      return;
    }
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      setSuccess('Welcome back! 🐾');
      setTimeout(() => navigate(from, { replace: true }), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (!auth) {
        throw new Error(firebaseUnavailableMessage);
      }
      if (mode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        if (form.name) {
          await updateProfile(userCredential.user, { displayName: form.name });
        }
        setSuccess('Account created! 🐶');
        setTimeout(() => setMode('login'), 1500);
      } else if (mode === 'login') {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        setSuccess('Welcome back! 🐾');
        setTimeout(() => navigate(from, { replace: true }), 1200);
      } else {
        setError('Phone login currently unavailable. Please use Email or Social Login.');
      }
    } catch (err: any) {
      setError(err.message);
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
          {/* Illustration */}
          <Box sx={{ mt: -2, mb: 2 }}>
            <CutePawIllustration />
          </Box>

          <Typography variant="h4" align="center" fontWeight={900} sx={{ mb: 0.5, color: '#243047' }}>
            {mode === 'login' ? '🐾 Welcome Back!' : mode === 'register' ? '🐶 Create Account' : '📱 Phone Login'}
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            {mode === 'login' ? 'Sign in to your pet store account' : mode === 'register' ? 'Join our pet-loving community!' : 'We\'ll send a one-time code to your number'}
          </Typography>

          {/* Social Logins */}
          {mode !== 'phone' && (
            <>
              {!isFirebaseConfigured && (
                <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, bgcolor: alpha('#ff8a65', 0.12), border: '1px solid rgba(255,138,101,0.25)' }}>
                  <Typography variant="body2" color="text.secondary" fontWeight={700} align="center">
                    {firebaseUnavailableMessage}
                  </Typography>
                </Box>
              )}
              <Stack spacing={1.5} sx={{ mb: 2.5 }}>
                <Button
                  fullWidth variant="outlined" startIcon={<GoogleIcon />}
                  disabled={loading || !isFirebaseConfigured}
                  onClick={() => handleSocialLogin(googleProvider)}
                  sx={{ borderRadius: 999, borderColor: 'rgba(36,48,71,0.2)', color: 'text.primary', py: 1.3, fontWeight: 800, '&:hover': { bgcolor: '#f5f5f5', borderColor: '#4285F4' } }}
                >
                  Continue with Google
                </Button>
                <Button
                  fullWidth variant="outlined" startIcon={<FacebookIcon />}
                  disabled={loading || !isFirebaseConfigured}
                  onClick={() => handleSocialLogin(facebookProvider)}
                  sx={{ borderRadius: 999, borderColor: 'rgba(36,48,71,0.2)', color: 'text.primary', py: 1.3, fontWeight: 800, '&:hover': { bgcolor: '#f0f4ff', borderColor: '#1877F2' } }}
                >
                  Continue with Facebook
                </Button>
              </Stack>

              <Divider sx={{ mb: 2.5 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={800}>or use email</Typography>
              </Divider>
            </>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {mode === 'register' && (
                <TextField label="Your Name" required value={form.name} onChange={setField('name')} sx={inputStyle} />
              )}
              {mode === 'phone' ? (
                <TextField
                  label="Phone Number" required type="tel" value={form.phone} onChange={setField('phone')}
                  InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: '#ff8a65' }} /></InputAdornment> }}
                  sx={inputStyle}
                />
              ) : (
                <>
                  <TextField
                    label="Email Address" required type="email" value={form.email} onChange={setField('email')}
                    InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: '#ff8a65' }} /></InputAdornment> }}
                    sx={inputStyle}
                  />
                  <TextField
                    label="Password" required type={showPass ? 'text' : 'password'} value={form.password} onChange={setField('password')}
                    InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPass(v => !v)} edge="end">{showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment> }}
                    sx={inputStyle}
                  />
                </>
              )}

              {!isFirebaseConfigured && mode !== 'phone' && (
                <Typography variant="body2" color="text.secondary" align="center">
                  Email sign-in will work after Firebase credentials are added.
                </Typography>
              )}

              {error && <Typography variant="body2" color="error" align="center" fontWeight={800}>{error}</Typography>}
              {success && <Typography variant="body2" color="success.main" align="center" fontWeight={800}>{success}</Typography>}

              <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}
                sx={{ borderRadius: 999, py: 1.6, fontWeight: 900, fontSize: '1rem', boxShadow: '0 12px 28px rgba(255,138,101,0.3)', '&:hover': { boxShadow: '0 16px 36px rgba(255,138,101,0.4)' } }}>
                {loading ? <CircularProgress size={22} color="inherit" /> : mode === 'login' ? '🐾 Sign In' : mode === 'register' ? '🐶 Create Account' : '📱 Send OTP'}
              </Button>
            </Stack>
          </Box>

          {/* Mode switchers */}
          <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 3, flexWrap: 'wrap', gap: 1 }}>
            {mode !== 'login' && <Button size="small" onClick={() => { setMode('login'); setError(''); setSuccess(''); }} sx={{ borderRadius: 999, fontWeight: 800, color: '#ff8a65' }}>Sign In</Button>}
            {mode !== 'register' && <Button size="small" onClick={() => { setMode('register'); setError(''); setSuccess(''); }} sx={{ borderRadius: 999, fontWeight: 800, color: '#49c5b6' }}>Create Account</Button>}
            {mode !== 'phone' && <Button size="small" onClick={() => { setMode('phone'); setError(''); setSuccess(''); }} sx={{ borderRadius: 999, fontWeight: 800, color: '#9d7cff' }}>Phone Login</Button>}
          </Stack>

          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" align="center" color="text.secondary" display="block">
            Are you a store admin? <Link to="/admin/login" style={{ color: '#ff8a65', fontWeight: 800 }}>Admin Login →</Link>
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
