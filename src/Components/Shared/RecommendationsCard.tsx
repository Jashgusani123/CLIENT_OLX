import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PropTypes from "prop-types";

const RecommendationsCard = ({ _id, images, price, description, address, uploadDate, onCardClick, onAddFavorite }) => {
  const placeholderImage = "path/to/placeholder-image.jpg"; // Replace with your placeholder image path

  return (
    <Card sx={{ width: "16rem", height: "20rem", position: "relative", margin: "1rem" }}>
      <CardMedia
        component="img"
        height="200"
        image={images[0] || placeholderImage} // Use placeholder if no image
        alt="Item Image"
        onClick={onCardClick}
        sx={{ cursor: "pointer", objectFit: "cover" }} // Maintain aspect ratio
      />
      
      <Tooltip title="Add to Favorites">
        <IconButton
          onClick={() => onAddFavorite(_id)}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: 2,
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Tooltip>

      <CardContent>
        <Typography variant="h6" sx={{ color: "green", fontWeight: "bold" }}>
          {price}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", color: "text.secondary" }}>
          <Typography variant="caption">{address}</Typography>
          <Typography variant="caption">{uploadDate ? new Date(uploadDate).toLocaleDateString() : 'N/A'}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Define prop types for better error handling
RecommendationsCard.propTypes = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.string,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  uploadDate: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
};

export default RecommendationsCard;
