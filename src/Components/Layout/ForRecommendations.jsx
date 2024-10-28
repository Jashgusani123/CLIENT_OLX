import React, { useEffect, useState } from 'react';
import RecommendationsCard from '../Shared/RecommendationsCard'; // Check this path
import { useNavigate } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import { useAuth } from '../../Context/AllContext'; // Replace with the correct path

const ForRecommendations = () => {
  const { AddFavorite, GetCards } = useAuth();
  const [Cards, setCards] = useState([]);

  // Use effect to fetch card data on component mount
  useEffect(() => {
    const fetchCards = async () => {
      const data = await GetCards();
      setCards(data);
    };
    fetchCards();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (item) => {
    let itemArray = [];
    itemArray.push(item)
    navigate("/item-detail", { state: itemArray }); // Pass the item directly as the state
  };
  

  const handleAddFavorite = (_id) => {
    console.log(_id);
    AddFavorite({ CardId: _id });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, backgroundColor: "#ffffff8e", padding: "0.5rem" }}>
        Fresh Recommendations
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", backgroundColor: "#ffffff8e" }}>
        {Cards.map((item) => {
          // Destructure properties from item for easier access
          const {
            _id,
            ItemName,
            Category,
            Brand,
            Description,
            AdditionalDetails,
            Price,
            Country,
            State,
            Images,
            MobileNo,
            Address,
            Date
          } = item;

          return (
            <RecommendationsCard
              key={_id}
              itemName={ItemName} // Using destructured values
              category={Category}
              brand={Brand}
              description={Description}
              additionalDetails={AdditionalDetails}
              price={Price}
              country={Country}
              state={State}
              images={Images} // Assuming Images is an array
              mobileNo={MobileNo}
              address={Address}
              uploadDate={Date}
              onCardClick={() => handleCardClick(item)}
              onAddFavorite={() => handleAddFavorite(_id)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default ForRecommendations;
