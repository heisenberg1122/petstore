import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import PetDetailPage from './pages/PetDetailPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';
import { useAuth } from './AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
  alpha,
} from '@mui/material';
import { cutePawFallback, fallbackCatalog, PetListing } from './data';
import { bustImageCache } from './utils';

interface CartItem extends PetListing {
  quantity: number;
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#ff8a65' },
    secondary: { main: '#49c5b6' },
    background: { default: '#fff8f2', paper: '#fffdfb' },
    text: { primary: '#243047', secondary: '#667085' },
  },
  shape: { borderRadius: 24 },
  typography: {
    fontFamily: 'Nunito, Segoe UI, system-ui, sans-serif',
    h1: { fontWeight: 900 },
    h2: { fontWeight: 900 },
    h3: { fontWeight: 900 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 },
    h6: { fontWeight: 800 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 999, textTransform: 'none', fontWeight: 800 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 28 } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 999, fontWeight: 800 } } },
    MuiTextField: { defaultProps: { fullWidth: true } },
  },
});

function currency(value: string | number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));
}

function titleize(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function hashColor(value: string) {
  const palette = ['#ff8a65', '#49c5b6', '#f7b267', '#9d7cff', '#ff6b9d', '#7bc47f'];
  const index = Math.abs([...value].reduce((acc, char) => acc + char.charCodeAt(0), 0)) % palette.length;
  return palette[index];
}

function ProductCard({ item, onAddToCart }: { item: PetListing; onAddToCart: (item: PetListing) => void }) {
  const accent = hashColor(item.category || item.categoryName || item.name);

  return (
    <Card className="pet-card-hover" sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 14px 36px rgba(36,48,71,0.08)' }}>
      <Box component={Link} to={`/pet/${item.id}`} sx={{ position: 'relative', overflow: 'hidden', height: 230, bgcolor: alpha(accent, 0.08), display: 'block', textDecoration: 'none' }}>
        <CardMedia
          component="img"
          image={item.images && item.images.length > 0 ? bustImageCache(item.images[0]) : cutePawFallback}
          alt={item.name}
          onError={(event) => {
            event.currentTarget.src = cutePawFallback;
          }}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 250ms ease', '&:hover': { transform: 'scale(1.05)' } }}
        />
        {item.featured && (
          <Chip label="Featured" size="small" sx={{ position: 'absolute', top: 12, right: 12, bgcolor: '#fff5da', color: '#8b5e00' }} />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.2, p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} flexWrap="wrap">
          <Chip label={item.categoryName || titleize(item.category)} size="small" sx={{ bgcolor: alpha(accent, 0.14), color: accent }} />
          <Typography variant="caption" color="text.secondary" fontWeight={800}>Stock {item.stockQuantity}</Typography>
        </Stack>

        <Box>
          <Typography variant="h6" sx={{ lineHeight: 1.15 }}>{item.name}</Typography>
          {item.breed && (
            <Typography variant="body2" color="text.secondary">{item.species ? `${item.species} · ` : ''}{item.breed}</Typography>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {item.description}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Typography variant="h5" sx={{ color: accent, fontWeight: 900 }}>{currency(item.price)}</Typography>
          {item.age && <Chip label={item.age} size="small" variant="outlined" />}
        </Stack>

        <Button variant="contained" fullWidth startIcon={<ShoppingBagOutlinedIcon />} onClick={() => onAddToCart(item)} sx={{ mt: 0.5, boxShadow: 'none', '&:hover': { boxShadow: '0 14px 24px rgba(255,138,101,0.2)' } }}>
          Take Me Home! 🐾
        </Button>
      </CardContent>
    </Card>
  );
}

// Navbar as a separate component so it can use hooks
function Navbar({ cartCount, onBrowse }: { cartCount: number; onBrowse: () => void }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isHome = location.pathname === '/';

  const navBtn = (label: string, to: string) => (
    <Button
      variant="text"
      component={Link}
      to={to}
      sx={{
        color: location.pathname === to ? 'primary.main' : 'text.secondary',
        fontWeight: location.pathname === to ? 900 : 800,
      }}
    >
      {label}
    </Button>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: alpha('#ffffff', 0.85), backdropFilter: 'blur(18px)', color: 'text.primary', borderBottom: '1px solid rgba(36,48,71,0.08)' }}>
      <Toolbar>
        <Container maxWidth="lg" sx={{ px: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', '&:hover': { opacity: 0.85 }, transition: 'opacity 0.2s ease' }}
          >
            <Avatar sx={{ bgcolor: 'primary.main', color: 'white', boxShadow: '0 12px 24px rgba(255,138,101,0.22)' }}><PetsOutlinedIcon /></Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1 }}>MyPetStore</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>Cute pets, easy shopping</Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            <Button
              variant="text"
              onClick={onBrowse}
              sx={{ color: isHome ? 'primary.main' : 'text.secondary', fontWeight: 800 }}
            >
              Browse
            </Button>
            {navBtn('About', '/about')}
            {navBtn('Contact', '/contact')}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar 
                    src={user.photoURL || undefined} 
                    sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.875rem' }}
                  >
                    {user.displayName?.[0] || user.email?.[0]}
                  </Avatar>
                  <Button 
                    variant="text" 
                    size="small" 
                    onClick={logout} 
                    sx={{ fontWeight: 800, color: 'text.secondary' }}
                  >
                    Logout
                  </Button>
                </Stack>
              ) : (
                <Button
                  variant="outlined"
                  component={Link}
                  to="/login"
                  sx={{
                    borderRadius: 999, fontWeight: 800, borderColor: 'primary.main', color: 'primary.main',
                    '&:hover': { bgcolor: alpha('#ff8a65', 0.08) }
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
            <IconButton component={Link} to="/cart" sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [catalog, setCatalog] = useState<PetListing[]>(fallbackCatalog);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCatalog() {
      try {
        const response = await fetch('/api/catalog', { signal: controller.signal });
        if (!response.ok) return;
        const data = (await response.json()) as PetListing[];
        if (Array.isArray(data) && data.length > 0) {
          setCatalog(data);
        }
      } catch {
        setCatalog(fallbackCatalog);
      }
    }
    void loadCatalog();
    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(catalog.map((item) => item.category))).filter(Boolean).sort((a, b) => a.localeCompare(b)),
    [catalog],
  );

  const filteredCatalog = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const filtered = catalog.filter((item) => {
      const categoryMatch = selectedCategory === 'ALL' || item.category === selectedCategory;
      const searchable = [item.name, item.breed, item.age, item.species, item.categoryName, item.description]
        .filter(Boolean).join(' ').toLowerCase();
      const searchMatch = !query || searchable.includes(query);
      const price = Number(item.price);
      const priceMatch = price >= priceRange[0] && price <= priceRange[1];
      return categoryMatch && searchMatch && priceMatch;
    });
    const sorter = {
      name: (a: PetListing, b: PetListing) => a.name.localeCompare(b.name),
      'price-asc': (a: PetListing, b: PetListing) => Number(a.price) - Number(b.price),
      'price-desc': (a: PetListing, b: PetListing) => Number(b.price) - Number(a.price),
    }[sortBy];
    return filtered.sort(sorter);
  }, [catalog, selectedCategory, searchTerm, priceRange, sortBy]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: PetListing) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) => (entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setCart((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)).filter((item) => item.quantity > 0));
  };

  const removeFromCart = (itemId: number) => setCart((prev) => prev.filter((item) => item.id !== itemId));
  const clearCart = () => setCart([]);

  const handleBrowse = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar cartCount={cartCount} onBrowse={handleBrowse} />

      <Box sx={{ flexGrow: 1 }}>
      <Routes>
        {/* HOME */}
        <Route path="/" element={
          <>
            <Box sx={{ py: { xs: 6, md: 8 }, background: 'linear-gradient(135deg, rgba(255,138,101,0.08), rgba(73,197,182,0.10))' }}>
              <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={7}>
                    <Stack spacing={2.5}>
                      <Chip label="Spring Boot + React + Render" sx={{ alignSelf: 'flex-start', bgcolor: alpha('#49c5b6', 0.16), color: '#22756f' }} />
                      <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, lineHeight: 1.02 }}>Find your next fluffy best friend.</Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 680 }}>Browse adorable pets, filter by category, sort by price, and keep the shopping vibe soft, playful, and easy to use.</Typography>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button size="large" variant="contained" onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}>Browse Pets</Button>
                        <Button size="large" variant="outlined" onClick={() => setFilterOpen(true)}>Adjust Price Range</Button>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Box
                        component="img"
                        src="/hero-image.png"
                        alt="Cute pet shop pets"
                        sx={{ width: '100%', maxWidth: 450, height: 'auto', borderRadius: 6, boxShadow: '0 24px 48px rgba(36,48,71,0.15)', transform: 'rotate(2deg)', transition: 'transform 0.3s ease', '&:hover': { transform: 'rotate(0deg) scale(1.02)' } }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            <Container id="catalog-section" maxWidth="lg" sx={{ py: 4 }}>
              <Stack spacing={3}>
                <Box sx={{ p: 2.2, borderRadius: 5, bgcolor: alpha('#ffffff', 0.88), border: '1px solid rgba(36,48,71,0.08)', boxShadow: '0 14px 34px rgba(36,48,71,0.05)' }}>
                  <Stack spacing={2}>
                    <TextField
                      placeholder="Search pets, breeds, or descriptions..."
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> }}
                    />
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Button variant={selectedCategory === 'ALL' ? 'contained' : 'outlined'} onClick={() => setSelectedCategory('ALL')}>All</Button>
                      {categories.map((category) => (
                        <Button key={category} variant={selectedCategory === category ? 'contained' : 'outlined'} onClick={() => setSelectedCategory(category)}>
                          {titleize(category)}
                        </Button>
                      ))}
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 800 }}>Sort by</Typography>
                        <Select fullWidth value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)}>
                          <MenuItem value="name">Name (A-Z)</MenuItem>
                          <MenuItem value="price-asc">Price (Low-High)</MenuItem>
                          <MenuItem value="price-desc">Price (High-Low)</MenuItem>
                        </Select>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 800 }}>Results</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 900 }}>{filteredCatalog.length} of {catalog.length} pets</Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Container>

            <Container maxWidth="lg" sx={{ pb: 8 }}>
              <Grid container spacing={3}>
                {filteredCatalog.length > 0 ? filteredCatalog.map((item) => (
                  <Grid key={item.id} item xs={12} sm={6} lg={4} xl={3}>
                    <ProductCard item={item} onAddToCart={addToCart} />
                  </Grid>
                )) : (
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center', py: 8, borderRadius: 6, border: '1px dashed rgba(36,48,71,0.12)', bgcolor: alpha('#ffffff', 0.7) }}>
                      <PetsOutlinedIcon sx={{ fontSize: 72, color: 'text.disabled', mb: 1 }} />
                      <Typography variant="h6" sx={{ mb: 1 }}>No pets found matching your filters</Typography>
                      <Button variant="contained" onClick={() => { setSelectedCategory('ALL'); setSearchTerm(''); setPriceRange([0, 3000]); }}>Clear Filters</Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Container>
          </>
        } />

        {/* DETAIL */}
        <Route path="/pet/:id" element={<PetDetailPage onAddToCart={addToCart} />} />

        {/* CART */}
        <Route path="/cart" element={<CartPage cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onClear={clearCart} />} />

        {/* ABOUT */}
        <Route path="/about" element={<AboutPage />} />

        {/* CONTACT */}
        <Route path="/contact" element={<ContactPage />} />

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* CHECKOUT */}
        <Route 
          path="/checkout" 
          element={
            authLoading ? (
              <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontWeight: 700 }}>
                  Checking your login session...
                </Typography>
              </Container>
            ) : user ? (
              <CheckoutPage cart={cart} onClear={clearCart} />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          } 
        />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* Price Range Dialog */}
      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 900 }}>Price range</DialogTitle>
        <DialogContent sx={{ pt: 2.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {currency(priceRange[0])} to {currency(priceRange[1])}
          </Typography>
          <Slider value={priceRange} onChange={(_, value) => setPriceRange(value as [number, number])} min={0} max={3000} step={25} valueLabelDisplay="auto" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterOpen(false)}>Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
