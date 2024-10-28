import React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#282c34",
        color: "#fff",
        py: 4,
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* Company Info Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" gutterBottom>
            We are dedicated to providing a platform for users to buy and sell items easily and efficiently.
          </Typography>
        </Grid>

        {/* Links Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            Home
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            About
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Contact Us
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Privacy Policy
          </Link>
        </Grid>

        {/* Social Media Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton color="inherit" href="https://facebook.com">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="https://twitter.com">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="https://instagram.com">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" href="https://linkedin.com">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Website Name. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
