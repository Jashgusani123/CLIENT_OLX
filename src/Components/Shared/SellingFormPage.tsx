import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SellingFormPage: React.FC<{ category: string; onSubmit: () => void }> = ({ category, onSubmit }) => {
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ brand, title, description, price, location, category });
    onSubmit();
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 2, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sell Your {category}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Brand"
              variant="outlined"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="location-label">Resident Area</InputLabel>
            <Select
              labelId="location-label"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <MenuItem value="Location 1">Location 1</MenuItem>
              <MenuItem value="Location 2">Location 2</MenuItem>
              <MenuItem value="Location 3">Location 3</MenuItem>
              {/* Add more locations as needed */}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SellingFormPage;
