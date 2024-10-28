import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
    Box,
    Typography,
    Avatar,
    Card,
    CardMedia,
    IconButton,
    Button,
    Dialog,
    DialogContent,
    IconButton as MUIIconButton,
    Tooltip,
} from "@mui/material";
import { FavoriteBorder, ArrowBack, ArrowForward } from "@mui/icons-material";
import Navbar from "./Navbar";
import SwipeableViews from "react-swipeable-views";
import {useAuth} from '../../Context/AllContext'

const ItemDetailPage = () => {
    const { state } = useLocation();
    const itemArray = state; // Directly access the item since it's not in an array
    const {startchat} = useAuth()

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [activeIndex, setActiveIndex] = useState(0); // Track the active image index

    const handleChangeIndex = (index) => {
        setActiveIndex(index);
    };
    const handleChatting= (userId)=>{
        startchat({selectedUserId:userId})
    }
    return (
        <>
            <Navbar />
            <Box sx={{ padding: 2, height: "100vh" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                    Item Details
                </Typography>
                <Box sx={{ display: "flex", mb: 4, height: "50vh" }}>
                    <Box sx={{ flex: 2 }}>
                        <Card sx={{ height: "100%" }}>
                            <CardMedia
                                component="img"
                                height="100%"
                                image={itemArray[0].Images[0]}
                                alt="Item Image"
                                sx={{ objectFit: "cover", cursor: "pointer" }}
                                onClick={handleClickOpen}
                            />
                        </Card>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            ml: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: "80%",
                        }}
                    >
                        <Card sx={{ position: "relative", padding: 2, flexGrow: 1, height: "100%" }}>
                            <Tooltip title="Favorite">
                                <IconButton sx={{ position: "absolute", top: 8, right: 8 }}>
                                    <FavoriteBorder />
                                </IconButton>
                            </Tooltip>

                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                ${itemArray[0].Price.toLocaleString()}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {itemArray[0].Description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {itemArray[0].Address} - {itemArray[0].Country}, {itemArray[0].State}
                            </Typography>
                        </Card>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 2, flexDirection: "column", width: "100%" }}>
                            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }}>
                                <Avatar alt={itemArray[0].Name} src={itemArray[0].Avatar} sx={{ width: 56, height: 56, mr: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {itemArray[0].Name}
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, width: "100%" }}>
                                <Button variant="contained" color="primary" sx={{ mt: 1, width: "100%" }} onClick={()=>handleChatting(itemArray[0].userId)}>
                                    Chat With
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Address Section */}
                <Box sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 1, backgroundColor: "#f9f9f9", width: "100%", boxShadow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Posted In:
                    </Typography>
                    <Typography variant="body2">{itemArray[0].Address}</Typography>
                </Box>

                {/* Details and Brand */}
                <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
                    <Box sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 1, backgroundColor: "#f9f9f9", width: "100%", boxShadow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Details
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            Brand: {itemArray[0].Brand}
                        </Typography>
                    </Box>
                    {itemArray[0].AdditionalDetails && (
                        <Box sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 1, backgroundColor: "#f9f9f9", width: "100%", boxShadow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Additional Details:
                            </Typography>
                            <Typography variant="body2">{itemArray[0].AdditionalDetails}</Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Modal for Full Images with Swipeable Views */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogContent sx={{ position: "relative" }}>
                    <SwipeableViews
                        index={activeIndex}
                        onChangeIndex={handleChangeIndex}
                        enableMouseEvents
                    >
                        {itemArray[0].Images.map((img, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                image={img}
                                alt={`Full Item Image ${index + 1}`}
                                sx={{ objectFit: "contain", height: "auto", width: "100%" }}
                            />
                        ))}
                    </SwipeableViews>

                    {/* Navigation Buttons */}
                    <MUIIconButton
                        sx={{ position: "absolute", top: "50%", left: 16, zIndex: 1 }}
                        onClick={() => handleChangeIndex(activeIndex - 1 < 0 ? 0 : activeIndex - 1)}
                        disabled={activeIndex === 0} // Disable if on the first image
                    >
                        <ArrowBack />
                    </MUIIconButton>
                    <MUIIconButton
                        sx={{ position: "absolute", top: "50%", right: 16, zIndex: 1 }}
                        onClick={() => handleChangeIndex(activeIndex + 1 >= itemArray[0].Images.length ? activeIndex : activeIndex + 1)}
                        disabled={activeIndex === itemArray[0].Images.length - 1} // Disable if on the last image
                    >
                        <ArrowForward />
                    </MUIIconButton>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ItemDetailPage;
