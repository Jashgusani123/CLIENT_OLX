import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Navbar from "./Navbar";
import { useAuth } from "../../Context/AllContext";
import { useNavigate } from "react-router-dom";

const FavoritePage: React.FC = () => {
  const navigate = useNavigate();
  const { GetFavoriteItem, Favorite, DeleteFavoriteItem, ViewItemDetails } = useAuth(); // Use Favorite directly from context

  useEffect(() => {
    GetFavoriteItem();
  }, []);

  const handleDeleteItem = (Id) => {
    DeleteFavoriteItem({ CardId: Id });
  };

  const handleViewDetails = async (ID) => {
    const itemArray = await ViewItemDetails({ ModelId: ID });
    navigate("/item-detail", { state: itemArray }); // Pass the item object directly as the state
  };
  

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Favorite Items
        </Typography>

        {Favorite.length === 0 ? ( // Use Favorite directly here
          <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
            No favorite items available.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {Favorite.map((item) => ( // Use Favorite directly here
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  {/* Item Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.Images[0]}
                    alt={item.Date}
                  />

                  <CardContent>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                      {item.Price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.Description.length > 50
                        ? item.Description.substring(0, 50) + "..."
                        : item.Description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      {item.Address.split(",")[0]}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                      Uploaded on: {new Date(item.Date).toLocaleDateString()}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleViewDetails(item.ModelId)}>
                      View Details
                    </Button>
                    <Button size="small" color="secondary" onClick={() => handleDeleteItem(item._id)}>
                      Remove from Favorites
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default FavoritePage;
