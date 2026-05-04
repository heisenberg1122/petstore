import { Link } from 'react-router-dom';
import {
  Box, Button, Card, CardMedia, Container, Divider, Grid,
  IconButton, Stack, Typography, alpha, Chip,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PetListing, cutePawFallback } from './data';
import { bustImageCache } from './utils';

interface CartItem extends PetListing { quantity: number; }

function currency(v: string | number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(v));
}

function hashColor(value: string) {
  const palette = ['#ff8a65', '#49c5b6', '#f7b267', '#9d7cff', '#ff6b9d', '#7bc47f'];
  const index = Math.abs([...value].reduce((acc, char) => acc + char.charCodeAt(0), 0)) % palette.length;
  return palette[index];
}

export default function CartPage({
  cart,
  onUpdateQuantity,
  onRemove,
  onClear,
}: {
  cart: CartItem[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
}) {
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 4, color: 'text.secondary' }}>
          Continue Shopping
        </Button>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 5 }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 36, color: 'primary.main' }} />
          <Box>
            <Typography variant="h3">Your Cart</Typography>
            <Typography color="text.secondary">{count} item{count !== 1 ? 's' : ''} selected</Typography>
          </Box>
        </Stack>

        {cart.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12, borderRadius: 6, border: '1px dashed rgba(36,48,71,0.12)', bgcolor: alpha('#ffffff', 0.7) }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 1 }}>Your cart is empty</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Browse our adorable pets and add them to your cart!</Typography>
            <Button variant="contained" size="large" component={Link} to="/">Browse Pets</Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                {cart.map(item => {
                  const accent = hashColor(item.category || item.name);
                  return (
                    <Card key={item.id} sx={{ p: 0, overflow: 'hidden', border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 8px 24px rgba(36,48,71,0.06)' }}>
                      <Stack direction="row" alignItems="stretch">
                        {/* Thumbnail */}
                        <Box
                          component={Link}
                          to={`/pet/${item.id}`}
                          sx={{ width: 130, flexShrink: 0, display: 'block', bgcolor: alpha(accent, 0.08), textDecoration: 'none', overflow: 'hidden' }}
                        >
                          <CardMedia
                            component="img"
                          image={item.images && item.images.length > 0 ? bustImageCache(item.images[0]) : cutePawFallback}
                            alt={item.name}
                            onError={e => { e.currentTarget.src = cutePawFallback; }}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.06)' } }}
                          />
                        </Box>

                        {/* Details */}
                        <Box sx={{ flex: 1, p: 2.5 }}>
                          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'flex-start' }} gap={2}>
                            <Box>
                              <Chip label={item.categoryName} size="small" sx={{ bgcolor: alpha(accent, 0.14), color: accent, fontWeight: 800, mb: 1 }} />
                              <Typography variant="h6" fontWeight={900} sx={{ lineHeight: 1.2 }}>{item.name}</Typography>
                              {item.breed && (
                                <Typography variant="body2" color="text.secondary">{item.species} · {item.breed}</Typography>
                              )}
                              <Typography variant="h6" sx={{ color: accent, fontWeight: 900, mt: 1 }}>{currency(item.price)}</Typography>
                            </Box>

                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: { xs: 1, sm: 0 } }}>
                              <Button size="small" variant="outlined" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} sx={{ minWidth: 36, px: 0 }}>−</Button>
                              <Typography sx={{ minWidth: 32, textAlign: 'center', fontWeight: 900, fontSize: '1.1rem' }}>{item.quantity}</Typography>
                              <Button size="small" variant="outlined" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} sx={{ minWidth: 36, px: 0 }}>+</Button>
                              <IconButton color="error" onClick={() => onRemove(item.id)} size="small">
                                <DeleteOutlineIcon />
                              </IconButton>
                            </Stack>
                          </Stack>

                          <Typography textAlign="right" sx={{ mt: 1.5, fontWeight: 900, color: 'primary.main' }}>
                            Subtotal: {currency(Number(item.price) * item.quantity)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  );
                })}
                <Button variant="text" color="error" onClick={onClear} sx={{ alignSelf: 'flex-start' }}>
                  Remove all items
                </Button>
              </Stack>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 16px 40px rgba(36,48,71,0.08)', position: 'sticky', top: 100 }}>
                <Typography variant="h5" fontWeight={900} sx={{ mb: 3 }}>Order Summary</Typography>
                <Stack spacing={2} sx={{ mb: 3 }}>
                  {cart.map(item => (
                    <Stack key={item.id} direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary" sx={{ flex: 1, mr: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name} × {item.quantity}
                      </Typography>
                      <Typography variant="body2" fontWeight={800}>{currency(Number(item.price) * item.quantity)}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={900}>Total</Typography>
                  <Typography variant="h5" fontWeight={900} color="primary.main">{currency(total)}</Typography>
                </Stack>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  component={Link}
                  to="/checkout"
                  sx={{ py: 1.8, fontSize: '1rem', boxShadow: '0 12px 24px rgba(255,138,101,0.25)', '&:hover': { boxShadow: '0 16px 32px rgba(255,138,101,0.35)' } }}
                >
                  Complete Adoption 🏡
                </Button>
                <Button variant="text" fullWidth component={Link} to="/" sx={{ mt: 1.5, color: 'text.secondary' }}>
                  Continue Shopping
                </Button>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
