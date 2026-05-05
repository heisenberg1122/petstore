import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Button, Chip, Container, Grid, Stack, Typography, alpha, useTheme, Card, CardContent, CardMedia, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { PetListing, cutePawFallback, fallbackCatalog } from '../data';
import { bustImageCache } from '../utils';

function currency(value: string | number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));
}

function hashColor(value: string) {
  const palette = ['#ff8a65', '#49c5b6', '#f7b267', '#9d7cff', '#ff6b9d', '#7bc47f'];
  const index = Math.abs([...value].reduce((acc, char) => acc + char.charCodeAt(0), 0)) % palette.length;
  return palette[index];
}

function RecommendedCard({ item, onAddToCart }: { item: PetListing; onAddToCart: (item: PetListing) => void }) {
  const accent = hashColor(item.category || item.name);
  return (
    <Card
      component={Link}
      to={`/pet/${item.id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        border: '1px solid rgba(36,48,71,0.08)',
        boxShadow: '0 8px 24px rgba(36,48,71,0.06)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 40px rgba(36,48,71,0.12)',
        },
      }}
    >
      <Box sx={{ position: 'relative', height: 180, bgcolor: alpha(accent, 0.08), overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={item.images && item.images.length > 0 ? bustImageCache(item.images[0]) : cutePawFallback}
          alt={item.name}
          onError={(e) => { e.currentTarget.src = cutePawFallback; }}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.06)' } }}
        />
        {item.featured && (
          <Chip label="Featured" size="small" sx={{ position: 'absolute', top: 10, right: 10, bgcolor: '#fff5da', color: '#8b5e00', fontWeight: 800 }} />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Chip label={item.categoryName} size="small" sx={{ bgcolor: alpha(accent, 0.14), color: accent, fontWeight: 800, mb: 1 }} />
        <Typography variant="subtitle1" fontWeight={900} sx={{ lineHeight: 1.2, mb: 0.5, color: 'text.primary' }}>
          {item.name}
        </Typography>
        {item.breed && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            {item.species} · {item.breed}
          </Typography>
        )}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ color: accent, fontWeight: 900 }}>{currency(item.price)}</Typography>
          <Button
            size="small"
            variant="contained"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart(item); }}
            sx={{ borderRadius: 999, px: 2, boxShadow: 'none', fontSize: '0.75rem' }}
          >
            Add
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function PetDetailPage({ onAddToCart }: { onAddToCart: (item: PetListing) => void }) {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const [pet, setPet] = useState<PetListing | null>(null);
  const [catalog, setCatalog] = useState<PetListing[]>(fallbackCatalog);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await fetch('/api/catalog');
        if (res.ok) {
          const data = await res.json() as PetListing[];
          if (Array.isArray(data) && data.length > 0) {
            setCatalog(data);
          }
        }
      } catch {
        // use fallback
      }
    };
    fetchCatalog();
  }, []);

  useEffect(() => {
    const found = catalog.find(p => p.id.toString() === id);
    if (found) {
      setPet(found);
      setActiveImage(found.images && found.images.length > 0 ? bustImageCache(found.images[0]) : cutePawFallback);
    }
  }, [id, catalog]);

  const recommended = useMemo(() => {
    if (!pet) return [];
    return catalog
      .filter(p => p.id.toString() !== id)
      .sort((a, b) => {
        // Same category first, then featured, then random
        const aCatMatch = a.category === pet.category ? 1 : 0;
        const bCatMatch = b.category === pet.category ? 1 : 0;
        if (bCatMatch !== aCatMatch) return bCatMatch - aCatMatch;
        if (b.featured !== a.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return 0;
      })
      .slice(0, 4);
  }, [pet, catalog, id]);

  if (!pet) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Pet not found</Typography>
        <Button component={Link} to="/" sx={{ mt: 2 }}>Back to Catalog</Button>
      </Container>
    );
  }

  const accent = hashColor(pet.category || pet.categoryName || pet.name);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 4, color: 'text.secondary' }}>
          Back to Catalog
        </Button>

        <Grid container spacing={6}>
          {/* Gallery Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 6, overflow: 'hidden', mb: 2, border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 24px 48px rgba(36,48,71,0.08)' }}>
              <Box sx={{ position: 'relative', height: 450, bgcolor: alpha(accent, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  image={bustImageCache(activeImage)}
                  alt={pet.name}
                  onError={(e) => { e.currentTarget.src = cutePawFallback; }}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Card>

            {pet.images && pet.images.length > 1 && (
              <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
                {pet.images.map((img, idx) => (
                  <Card
                    key={idx}
                    onClick={() => setActiveImage(bustImageCache(img))}
                    sx={{
                      width: 80, height: 80, flexShrink: 0, cursor: 'pointer',
                      border: activeImage === bustImageCache(img) ? `2px solid ${accent}` : '1px solid transparent',
                      opacity: activeImage === img ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                      '&:hover': { opacity: 1 }
                    }}
                  >
                    <CardMedia component="img" image={bustImageCache(img)} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Card>
                ))}
              </Stack>
            )}
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Box>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip label={pet.categoryName} sx={{ bgcolor: alpha(accent, 0.14), color: accent, fontWeight: 800 }} />
                  {pet.featured && <Chip label="Featured" sx={{ bgcolor: '#fff5da', color: '#8b5e00', fontWeight: 800 }} />}
                </Stack>
                <Typography variant="h2" sx={{ lineHeight: 1.1, mb: 1 }}>{pet.name}</Typography>
                <Typography variant="h4" sx={{ color: accent, fontWeight: 900 }}>{currency(pet.price)}</Typography>
              </Box>

              <Divider />

              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                {pet.description}
              </Typography>

              <Grid container spacing={2}>
                {pet.species && (
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, borderRadius: 4, bgcolor: alpha('#ffffff', 0.6), border: '1px solid rgba(36,48,71,0.06)' }}>
                      <Typography variant="caption" color="text.secondary">Species</Typography>
                      <Typography variant="subtitle1" fontWeight={800}>{pet.species}</Typography>
                    </Box>
                  </Grid>
                )}
                {pet.breed && (
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, borderRadius: 4, bgcolor: alpha('#ffffff', 0.6), border: '1px solid rgba(36,48,71,0.06)' }}>
                      <Typography variant="caption" color="text.secondary">Breed</Typography>
                      <Typography variant="subtitle1" fontWeight={800}>{pet.breed}</Typography>
                    </Box>
                  </Grid>
                )}
                {pet.age && (
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, borderRadius: 4, bgcolor: alpha('#ffffff', 0.6), border: '1px solid rgba(36,48,71,0.06)' }}>
                      <Typography variant="caption" color="text.secondary">Age</Typography>
                      <Typography variant="subtitle1" fontWeight={800}>{pet.age}</Typography>
                    </Box>
                  </Grid>
                )}
                <Grid item xs={6}>
                  <Box sx={{ p: 2, borderRadius: 4, bgcolor: alpha('#ffffff', 0.6), border: '1px solid rgba(36,48,71,0.06)' }}>
                    <Typography variant="caption" color="text.secondary">Availability</Typography>
                    <Typography variant="subtitle1" fontWeight={800} color={pet.stockQuantity > 0 ? 'success.main' : 'error.main'}>
                      {pet.stockQuantity > 0 ? `In Stock (${pet.stockQuantity})` : 'Out of Stock'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ pt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingBagOutlinedIcon />}
                  onClick={() => onAddToCart(pet)}
                  disabled={pet.stockQuantity === 0}
                  sx={{ py: 2, fontSize: '1.1rem', boxShadow: '0 12px 24px rgba(255,138,101,0.25)', '&:hover': { boxShadow: '0 16px 32px rgba(255,138,101,0.35)' } }}
                >
                  Take Me Home! 🐾
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Recommended Pets */}
        {recommended.length > 0 && (
          <Box sx={{ mt: 10 }}>
            <Divider sx={{ mb: 6 }} />
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Box sx={{ flex: 1, height: 3, borderRadius: 99, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              <Typography variant="h4" sx={{ fontWeight: 900, flexShrink: 0 }}>
                You May Also Like
              </Typography>
              <Box sx={{ flex: 1, height: 3, borderRadius: 99, background: `linear-gradient(270deg, ${accent}, transparent)` }} />
            </Stack>
            <Grid container spacing={3}>
              {recommended.map(item => (
                <Grid key={item.id} item xs={12} sm={6} md={3}>
                  <RecommendedCard item={item} onAddToCart={onAddToCart} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
