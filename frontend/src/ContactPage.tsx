import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, alpha, Avatar } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contacts = [
    { icon: <EmailOutlinedIcon />, label: 'Email Us', value: 'hello@mypetstore.com', sub: 'We reply within 24 hours' },
    { icon: <PhoneOutlinedIcon />, label: 'Call Us', value: '+1 (800) PET-SHOP', sub: 'Mon–Fri, 9am–6pm' },
    { icon: <LocationOnOutlinedIcon />, label: 'Visit Us', value: '123 Paws Avenue, Pet City', sub: 'Open 7 days a week' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 4, color: 'text.secondary' }}>
          Back to Home
        </Button>

        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>Get in Touch</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 540, mx: 'auto' }}>
            Have a question about a pet? Need advice on which companion is right for you? We would love to hear from you!
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {contacts.map(c => (
                <Card key={c.label} sx={{ p: 3, border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 8px 24px rgba(36,48,71,0.06)' }}>
                  <Stack direction="row" spacing={2.5} alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'white', width: 48, height: 48 }}>{c.icon}</Avatar>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={800} display="block">{c.label}</Typography>
                      <Typography fontWeight={900}>{c.value}</Typography>
                      <Typography variant="caption" color="text.secondary">{c.sub}</Typography>
                    </Box>
                  </Stack>
                </Card>
              ))}

              <Card sx={{ p: 3, border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 8px 24px rgba(36,48,71,0.06)', background: 'linear-gradient(135deg, rgba(255,138,101,0.08), rgba(73,197,182,0.10))' }}>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>🐾 Quick Tip</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  For the fastest response, include the name of the pet you are interested in and your preferred contact time in your message.
                </Typography>
              </Card>
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3.5, border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 16px 40px rgba(36,48,71,0.08)' }}>
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <CheckCircleOutlineIcon sx={{ fontSize: 72, color: 'success.main', mb: 2 }} />
                  <Typography variant="h4" sx={{ mb: 2 }}>Message Sent! 🎉</Typography>
                  <Typography color="text.secondary" sx={{ mb: 4 }}>
                    Thank you, {form.name}! We have received your message and will get back to you at {form.email} within 24 hours.
                  </Typography>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="contained" component={Link} to="/">Browse Pets</Button>
                    <Button variant="outlined" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                      Send Another
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Typography variant="h4" fontWeight={900} sx={{ mb: 3 }}>Send Us a Message</Typography>
                  {/* Two-column row: Name + Email */}
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5, mb: 2.5 }}>
                    <TextField
                      label="Your Name"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                    <TextField
                      label="Email Address"
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </Box>
                  {/* Full-width fields */}
                  <Stack spacing={2.5}>
                    <TextField
                      label="Subject"
                      required
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    />
                    <TextField
                      label="Your Message"
                      multiline
                      rows={5}
                      required
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us which pet you're interested in, or ask us anything..."
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ py: 1.8, fontSize: '1rem', boxShadow: '0 12px 24px rgba(255,138,101,0.25)', '&:hover': { boxShadow: '0 16px 32px rgba(255,138,101,0.35)' } }}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
