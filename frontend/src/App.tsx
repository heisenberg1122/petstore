import type { ReactNode } from 'react';
import { useEffect, useState, useMemo } from 'react';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
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
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Slider,
  FormControl,
  Select
} from '@mui/material';
import { fallbackCatalog, PetListing, PetCategory } from './data';

const categoryInfo: Record<PetCategory, { label: string; icon: ReactNode; color: string }> = {
  DOGS: { label: 'Dogs', icon: <PetsOutlinedIcon />, color: '#8B4513' },
  CATS: { label: 'Cats', icon: <PetsOutlinedIcon />, color: '#FF6B6B' },
  BIRDS: { label: 'Birds', icon: <PetsOutlinedIcon />, color: '#FFD700' },
  FISHES: { label: 'Fishes', icon: <PetsOutlinedIcon />, color: '#0066CC' }
};

interface CartItem extends PetListing {
  quantity: number;
}

function currency(value: string | number) {
  const num = typeof value === 'string' ? Number(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(num);
}

function FeatureCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      p: 2,
      borderRadius: '12px',
      bgcolor: '#f5f5f5',
      border: '1px solid #e0e0e0'
    }}>
      <Avatar sx={{ bgcolor: '#1976d2', color: 'white' }}>{icon}</Avatar>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        <Typography variant="subtitle2" fontWeight={700}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

function ProductCard({ item, onAddToCart }: { item: PetListing; onAddToCart: (item: PetListing) => void }) {
  const catInfo = categoryInfo[item.category];
  
  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #e0e0e0',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
        transform: 'translateY(-4px)'
      }
    }}>
      <Box sx={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <CardMedia
          component="img"
          height="220"
          image={item.imageUrl}
          alt={item.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.05)' }
          }}
        />
        {item.featured && (
          <Chip
            label="Featured"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: '#ffc107',
              fontWeight: 700
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
          <Chip
            label={categoryInfo[item.category].label}
            size="small"
            sx={{
              bgcolor: catInfo.color,
              color: 'white',
              fontWeight: 600,
              height: '24px'
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Stock: {item.stockQuantity}
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700, color: '#333' }}>
          {item.name}
        </Typography>

        {item.breed && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            Breed: {item.breed}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {item.description}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1976d2' }}>
            {currency(item.price)}
          </Typography>
          {item.age && (
            <Typography variant="caption" sx={{ bgcolor: '#f0f0f0', px: 1, py: 0.5, borderRadius: '4px', fontWeight: 600 }}>
              Age: {item.age}
            </Typography>
          )}
        </Stack>

        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingBagOutlinedIcon />}
          onClick={() => onAddToCart(item)}
          sx={{
            bgcolor: '#1976d2',
            fontWeight: 700,
            '&:hover': {
              bgcolor: '#1565c0'
            }
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [catalog, setCatalog] = useState<PetListing[]>(fallbackCatalog);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PetCategory | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');
  const [filterOpen, setFilterOpen] = useState(false);

  const addToCart = (item: PetListing) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        )
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter and sort logic
  const filteredAndSortedCatalog = useMemo(() => {
    let filtered = catalog.filter((item) => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const price = Number(item.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    });

    // Sort
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [catalog, selectedCategory, searchTerm, priceRange, sortBy]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog() {
      try {
        const response = await fetch('/api/catalog', { signal: controller.signal });
        if (!response.ok) {
          return;
        }
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

  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
        {/* Header */}
        <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'white', color: '#333' }}>
          <Toolbar>
            <Container maxWidth="lg" sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', px: 0 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: '#1976d2', color: 'white' }}>
                  <PetsOutlinedIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#333' }}>
                    MyPetStore
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Premium Pet Marketplace
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button sx={{ textTransform: 'none', fontWeight: 600, color: '#333' }}>
                  Browse
                </Button>
                <Button sx={{ textTransform: 'none', fontWeight: 600, color: '#333' }}>
                  About
                </Button>
                <Button sx={{ textTransform: 'none', fontWeight: 600, color: '#333' }}>
                  Contact
                </Button>
                <IconButton
                  onClick={() => setCartOpen(true)}
                  sx={{
                    bgcolor: '#1976d2',
                    color: 'white',
                    ml: 2,
                    '&:hover': {
                      bgcolor: '#1565c0'
                    }
                  }}
                >
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingBagOutlinedIcon />
                  </Badge>
                </IconButton>
              </Stack>
            </Container>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box sx={{ bgcolor: 'white', py: 6, borderBottom: '1px solid #e0e0e0' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, color: '#333' }}>
                  Find Your Perfect Companion
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
                  Discover a wide selection of healthy, well-cared-for pets from trusted breeders. Every animal is health-checked and ready for their forever home.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button variant="contained" size="large" sx={{ textTransform: 'none', fontWeight: 700 }}>
                    Browse All Pets
                  </Button>
                  <Button variant="outlined" size="large" sx={{ textTransform: 'none', fontWeight: 700 }}>
                    Learn More
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={5}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FeatureCard icon={<VerifiedOutlinedIcon />} label="Health Verified" value="100% Certified" />
                  </Grid>
                  <Grid item xs={6}>
                    <FeatureCard icon={<LocalShippingOutlinedIcon />} label="Safe Delivery" value="Door to Door" />
                  </Grid>
                  <Grid item xs={6}>
                    <FeatureCard icon={<ShoppingBagOutlinedIcon />} label="Shop Online" value="Easy Checkout" />
                  </Grid>
                  <Grid item xs={6}>
                    <FeatureCard icon={<PetsOutlinedIcon />} label="Adoption" value="24/7 Support" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Filters & Search */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Stack spacing={3}>
            <Box sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center',
              bgcolor: 'white',
              p: 2,
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              {/* Search */}
              <TextField
                placeholder="Search by name or breed..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{ flex: 1, minWidth: '250px' }}
              />

              {/* Category Filter */}
              <FormControl size="small" sx={{ minWidth: '140px' }}>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as PetCategory | 'ALL')}
                >
                  <MenuItem value="ALL">All Categories</MenuItem>
                  <MenuItem value="DOGS">Dogs</MenuItem>
                  <MenuItem value="CATS">Cats</MenuItem>
                  <MenuItem value="BIRDS">Birds</MenuItem>
                  <MenuItem value="FISHES">Fishes</MenuItem>
                </Select>
              </FormControl>

              {/* Sort */}
              <FormControl size="small" sx={{ minWidth: '140px' }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc' | 'name')}
                >
                  <MenuItem value="name">Name (A-Z)</MenuItem>
                  <MenuItem value="price-asc">Price (Low-High)</MenuItem>
                  <MenuItem value="price-desc">Price (High-Low)</MenuItem>
                </Select>
              </FormControl>

              {/* Filter Button */}
              <Button
                variant="outlined"
                onClick={() => setFilterOpen(true)}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Advanced Filters
              </Button>
            </Box>

            {/* Category Chips */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                label="All Categories"
                onClick={() => setSelectedCategory('ALL')}
                variant={selectedCategory === 'ALL' ? 'filled' : 'outlined'}
                sx={{ fontWeight: 600 }}
              />
              {(['DOGS', 'CATS', 'BIRDS', 'FISHES'] as PetCategory[]).map((cat) => (
                <Chip
                  key={cat}
                  label={categoryInfo[cat].label}
                  onClick={() => setSelectedCategory(cat)}
                  variant={selectedCategory === cat ? 'filled' : 'outlined'}
                  sx={{
                    fontWeight: 600,
                    ...(selectedCategory === cat && {
                      bgcolor: categoryInfo[cat].color,
                      color: 'white'
                    })
                  }}
                />
              ))}
            </Stack>

            {/* Results Count */}
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
              Showing {filteredAndSortedCatalog.length} of {catalog.length} pets
            </Typography>
          </Stack>
        </Container>

        {/* Products Grid */}
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          {filteredAndSortedCatalog.length > 0 ? (
            <Grid container spacing={3}>
              {filteredAndSortedCatalog.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} lg={4} xl={3}>
                  <ProductCard item={item} onAddToCart={addToCart} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <PetsOutlinedIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No pets found matching your criteria
              </Typography>
              <Button
                variant="text"
                sx={{ mt: 2 }}
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchTerm('');
                  setPriceRange([0, 3000]);
                }}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Container>

        {/* Advanced Filter Dialog */}
        <Dialog open={filterOpen} onClose={() => setFilterOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Filter Options</DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  Price Range: {currency(priceRange[0])} - {currency(priceRange[1])}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                  min={0}
                  max={3000}
                  step={50}
                  valueLabelDisplay="auto"
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFilterOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Shopping Cart Dialog */}
        <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Shopping Cart ({cartCount} items)
            <IconButton size="small" onClick={() => setCartOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ pt: 2 }}>
            {cart.length === 0 ? (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Your cart is empty
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Start shopping to add items to your cart
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {cart.map((item) => (
                  <Card key={item.id} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {item.breed && `Breed: ${item.breed}`}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: '#1976d2', fontWeight: 700 }}>
                          {currency(item.price)} each
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ minWidth: '32px', p: 0.5 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </Button>
                        <Typography sx={{ minWidth: '24px', textAlign: 'center', fontWeight: 700 }}>
                          {item.quantity}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ minWidth: '32px', p: 0.5 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                          sx={{ color: '#d32f2f' }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 1, textAlign: 'right', color: '#1976d2', fontWeight: 700 }}>
                      Subtotal: {currency(Number(item.price) * item.quantity)}
                    </Typography>
                  </Card>
                ))}

                {/* Total */}
                <Card sx={{ p: 2, bgcolor: '#f5f5f5', border: '1px solid #e0e0e0' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={700} sx={{ fontSize: '16px' }}>
                      Total:
                    </Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: '20px', color: '#1976d2' }}>
                      {currency(cartTotal)}
                    </Typography>
                  </Stack>
                </Card>
              </Stack>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setCartOpen(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              disabled={cart.length === 0}
              sx={{
                textTransform: 'none',
                fontWeight: 700
              }}
            >
              Proceed to Checkout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
