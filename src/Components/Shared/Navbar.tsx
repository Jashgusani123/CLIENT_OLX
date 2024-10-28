import {
  Cancel as CancelIcon,
  Chat as ChatIcon,
  FavoriteBorder,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AllContext";

const Navbar = () => {
  const {user} = useAuth();
  const navigate = useNavigate()
  const [searchTerm, setsearchTerm] = useState("");
  const [anchorEl, setanchorEl] = useState(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearchChange = () => {
    console.log("handleSearchChange");
  };
  const handleAddFavorite = () => {
    console.log("handleAddFavorite");
  };
  const handleMenuOpen = () => {
    console.log("handleMenuOpen");
  };
  const handleMenuClose = () => {
    console.log("HandleMenuClose");
  };
  const handleProfile = () => {
    navigate("/profile")
  };
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
    console.log("toggleDrawer");
  };
  const handleLogoutOpen = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };
  const handleConfirmLogout = () => {
    setLogoutOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="primary"
        sx={{ backgroundColor: "#2648e0", padding: "0", zIndex: 1 }} // Set padding to 0
      >
        <Toolbar sx={{ padding: "0.6rem" }}> {/* Set padding to 0 */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "800", fontFamily: "sans-serif" }} onClick={() => navigate("/")}>
            GoodsExchange
          </Typography>

          <TextField
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon htmlColor="white" />
                </InputAdornment>
              ),
            }}
            sx={{
              display: { xs: "none", md: "flex" },
              backgroundColor: "transparent",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  borderRadius: "20px",
                },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              width: "32rem",
              marginLeft: "1rem",
              marginRight: "1rem",
              animation: "coming 0.5s ease forwards",
              "@keyframes coming": {
                "0%": { transform: "translateY(-20px)", opacity: 0 },
                "100%": { transform: "translateY(0)", opacity: 1 },
              },
            }}
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {/* Main navigation buttons for desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Chat">
              <IconButton color="inherit" sx={{ display: { xs: "none", md: "flex" } }} onClick={() => navigate("/chat")}>
                <ChatIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton color="inherit" sx={{ display: { xs: "none", md: "flex" } }} onClick={() => navigate("/notifications")}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Profile Icon */}
          <Tooltip title="Favorite" onClick={handleAddFavorite}>
            <IconButton color="inherit" sx={{ display: { xs: "none", md: "flex" } }} onClick={() => navigate("/favorite")}>
              <FavoriteBorder />
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile" onClick={handleProfile}>
            <IconButton color="inherit" >
              <Avatar src={user.Avatar} />
            </IconButton>
          </Tooltip>
          <Button
            sx={{ margin: "1rem", color: "black", fontFamily: "sans-serif", fontWeight: "600" }}
            className="button-85"
            role="button"
            onClick={() => navigate("/sell")}
          >
            Sell
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleProfile}>
              <Avatar src={user.Avatar} sx={{ marginRight: "0.5rem" }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogoutOpen} sx={{ display: "flex", justifyContent: "center" }}>
              Logout
            </MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutOpen} onClose={handleLogoutClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to logout?</DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
