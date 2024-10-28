import React, { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Navbar from "./Navbar";

const SellPage = () => {
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [AdditionalDetails, setAdditionalDetails] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]); // Explicitly define type as File[]
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]); // State for image previews

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value); // No need for type assertion here
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setPhotos((prev) => [...prev, ...newFiles]); // Add new files to the state

      // Create URLs for the new files to display previews
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPhotoPreviews((prev) => [...prev, ...newPreviews]); // Add new previews to the state
    }
  };

  const handlePost = () => {
    // Handle posting the data to your backend
    setCategory("");
    setBrand("");
    setTitle("");
    setDescription("");
    setPrice("");
    setArea("");
    setPhotos([]);
    setPhotoPreviews([]);
    setAdditionalDetails("")
  };

  return (
    <>
    <Navbar/>
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sell Your Item
      </Typography>
      
      {/* Category Selection */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={handleCategoryChange}>
          <MenuItem value="mobile">Mobile & Mobile Accessories</MenuItem>
          <MenuItem value="car">Car</MenuItem>
          <MenuItem value="fashion">Fashion</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
        </Select>
      </FormControl>

      {/* Form Inputs */}
      <TextField
        label="Brand"
        fullWidth
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Title or Name"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description (What is this item?)"
        fullWidth
        multiline
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Additional Details"
        fullWidth
        value={AdditionalDetails}
        rows={4}
        onChange={(e) => setAdditionalDetails(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Set Price"
        fullWidth
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Resident Area"
        fullWidth
        value={area}
        onChange={(e) => setArea(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* File Upload Section */}
      <Box sx={{ marginBottom: 2 }}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span">
            Upload Images
          </Button>
        </label>
        {/* Display Image Previews */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
          {photoPreviews.map((src, index) => (
            <Box key={index} sx={{ position: 'relative', marginRight: 1, marginBottom: 1 }}>
              <img
                src={src}
                alt={`preview-${index}`}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 4,
                  marginRight: 8,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Button variant="contained" onClick={handlePost}>
        Post
      </Button>
    </Box>
    </>
  );
};

export default SellPage;
