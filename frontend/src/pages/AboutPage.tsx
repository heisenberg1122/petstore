import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid, Stack, Typography, alpha, Avatar, Card } from '@mui/material';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function AboutPage() {
  const values = [
    { icon: <FavoriteIcon />, title: 'Passion for Pets', desc: 'We are a team of passionate animal lovers who believe every pet deserves a loving home. Our mission is to make that connection as smooth and joyful as possible.' },
    { icon: <VerifiedOutlinedIcon />, title: 'Health Guaranteed', desc: 'Every pet in our store has been thoroughly health-checked by a certified veterinarian. We only list pets that are healthy, vaccinated, and ready for their forever home.' },
    { icon: <LocalShippingOutlinedIcon />, title: 'Safe Delivery', desc: 'We partner with trusted, animal-friendly carriers to ensure your new companion reaches you safely, comfortably, and on time — every single time.' },
    { icon: <PetsOutlinedIcon />, title: 'Lifetime Support', desc: 'Our relationship doesn\'t end at checkout. We offer ongoing support to help you and your pet settle in, thrive, and live your best life together.' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 4, color: 'text.secondary' }}>
          Back to Home
        </Button>

        {/* Hero */}
        <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 }, mb: 8, borderRadius: 6, background: 'linear-gradient(135deg, rgba(255,138,101,0.10), rgba(73,197,182,0.12))' }}>
          <Avatar sx={{ bgcolor: 'primary.main', color: 'white', width: 80, height: 80, mx: 'auto', mb: 3, boxShadow: '0 16px 32px rgba(255,138,101,0.3)' }}>
            <PetsOutlinedIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h2" sx={{ mb: 2 }}>About MyPetStore</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', lineHeight: 1.7 }}>
            We started MyPetStore with one simple belief: finding your perfect pet companion should be a joyful, easy, and trustworthy experience. Since our founding, we have helped thousands of families find their furry, feathered, and finned best friends.
          </Typography>
        </Box>

        {/* Story */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 3 }}>Our Story</Typography>
            <Stack spacing={2}>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                MyPetStore was founded in 2020 by a small group of animal lovers who were frustrated with the lack of trustworthy, transparent, and user-friendly pet adoption platforms available online. We believed the process of finding a pet should feel as warm and welcoming as the animals themselves.
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                Starting with just a handful of dog breeders and cat rescues in our network, we have grown into a platform that connects pet lovers with responsible breeders and sellers across all types of animals — from playful puppies and graceful cats to colorful birds and stunning aquarium fish.
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                Today, we are proud to be one of the most trusted pet marketplaces, built on a foundation of transparency, animal welfare, and genuine love for what we do. Every listing on our platform is verified, every animal is health-checked, and every transaction is backed by our satisfaction guarantee.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/hero-image.png"
              alt="Happy pets"
              sx={{ width: '100%', borderRadius: 6, boxShadow: '0 24px 48px rgba(36,48,71,0.12)', transform: 'rotate(-1deg)' }}
            />
          </Grid>
        </Grid>

        {/* Values */}
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6 }}>What We Stand For</Typography>
        <Grid container spacing={3} sx={{ mb: 10 }}>
          {values.map(v => (
            <Grid key={v.title} item xs={12} sm={6}>
              <Card sx={{ p: 3.5, height: '100%', border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 8px 24px rgba(36,48,71,0.06)' }}>
                <Stack direction="row" spacing={2.5} alignItems="flex-start">
                  <Avatar sx={{ bgcolor: 'primary.main', color: 'white', width: 52, height: 52, flexShrink: 0, mt: 0.5 }}>{v.icon}</Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>{v.title}</Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{v.desc}</Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', p: 6, borderRadius: 6, background: 'linear-gradient(135deg, rgba(255,138,101,0.10), rgba(73,197,182,0.12))' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Ready to find your new best friend?</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>Browse our catalog of 20+ adorable pets waiting for their forever home.</Typography>
          <Button variant="contained" size="large" component={Link} to="/" sx={{ px: 5, py: 1.5, fontSize: '1.05rem' }}>
            Browse All Pets
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
