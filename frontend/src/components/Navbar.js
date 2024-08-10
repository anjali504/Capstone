import React, { useContext, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { AuthContext } from '../context/AuthContext';
import '../stylesheet/Navbar.css';

const pages = [
  { title: 'Home', path: '/' }
];

const settings = [
  { title: 'Profile', path: '/profile' },
  { title: 'Logout', path: '/logout' }
];

const Navbar = () => {
  const { user, logout, organizer, admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuItemClick = (setting) => {
    if (setting.title === 'Logout') {
      handleLogout();
    } else {
      navigate(setting.path);
    }
    handleCloseUserMenu();
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const loggedInStyles = {
    p: 0,
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1.5rem'
  };

  const loggedOutStyles = {
    my: 2,
    color: 'black',
    display: 'block'
  };

  const roleBasedPages = admin ? [
    { title: 'Admin Dashboard', path: '/admin-dashboard' }
  ] : organizer ? [
    { title: 'Organizer Dashboard', path: '/organizer-dashboard' },
    { title: 'Bookings', path: '/bookings' },
    { title: 'Contact Us', path: '/contactus' },
    { title: 'About Us', path: '/aboutus' }
  ] : user ? [
    { title: 'Events', path: '/events' },
    { title: 'Buy Tickets', path: '/cart' },
    { title: 'Contact Us', path: '/contactus' },
    { title: 'About Us', path: '/aboutus' }
  ] : pages;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img src="/logo.png" alt="Logo" style={{ height: 40, marginRight: 20 }} />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {roleBasedPages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {page.title}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {roleBasedPages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user || organizer || admin ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={loggedInStyles}>
                  {getInitial(user ? user.name : (organizer ? organizer.name : admin.name))}
                </IconButton>
              </Tooltip>
            ) : (
              location.pathname !== '/login' && ( // Conditionally render the login button
                <Button
                  onClick={() => navigate('/login')}
                  sx={loggedOutStyles}
                >
                  Login
                </Button>
              )
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={() => handleMenuItemClick(setting)}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
