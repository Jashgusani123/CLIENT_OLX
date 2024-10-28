import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  useTheme,
  Card,
} from "@mui/material";
import { Edit, Logout, Check } from "@mui/icons-material";
import Navbar from "./Navbar";
import { useAuth } from "../../Context/AllContext";

const ProfilePage: React.FC = () => {
  const { user, setUser, UpdateDetail , LogoutUser } = useAuth();
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState({
    Name: false,
    Address: false,
    username: false,
    Country: false,
    State: false,
  });

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleEditToggle = (field: string) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Handler to update user profile information
  const handleProfileUpdate = (field: string, value: string) => {
    UpdateDetail({ [field]: value }) // Pass updated field and value to UpdateDetail
      .then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          [field]: value,
        }));
        handleEditToggle(field); // Close edit mode after update
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    LogoutUser()
    setLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: 4,
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 600,
          margin: "auto",
          mt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Profile Page
        </Typography>

        <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 1 }}>
          <Stack direction="column" spacing={4} alignItems="center">
            <Avatar
              src={user.Avatar}
              alt={user.Name}
              sx={{
                width: 150,
                height: 150,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />

            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="Name"
                  value={user.Name}
                  isEditing={isEditing.Name}
                  onEditToggle={() => handleEditToggle("Name")}
                  onSave={(value: string) => handleProfileUpdate("Name", value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="UserName"
                  value={user.username}
                  isEditing={isEditing.username}
                  onEditToggle={() => handleEditToggle("username")}
                  onSave={(value: string) =>
                    handleProfileUpdate("username", value)
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="Address"
                  value={user.Address}
                  isEditing={isEditing.Address}
                  onEditToggle={() => handleEditToggle("Address")}
                  onSave={(value: string) => handleProfileUpdate("Address", value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="Country"
                  value={user.Country}
                  isEditing={isEditing.Country}
                  onEditToggle={() => handleEditToggle("Country")}
                  onSave={(value: string) => handleProfileUpdate("Country", value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="State"
                  value={user.State}
                  isEditing={isEditing.State}
                  onEditToggle={() => handleEditToggle("State")}
                  onSave={(value: string) => handleProfileUpdate("State", value)}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="error"
              startIcon={<Logout />}
              onClick={handleLogoutClick}
              sx={{ width: "100%", padding: "10px" }}
            >
              Logout
            </Button>
          </Stack>
        </Card>

        <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to logout from your account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogoutCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogoutConfirm} color="error" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

const ProfileField: React.FC<{
  label: string;
  value: string;
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: (value: string) => void;
}> = ({ label, value, isEditing, onEditToggle, onSave }) => {
  const [newValue, setNewValue] = useState<string>(value);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        label={label}
        value={isEditing ? newValue : value}
        onChange={(e) => setNewValue(e.target.value)}
        InputProps={{
          readOnly: !isEditing,
        }}
        variant="outlined"
        fullWidth
        sx={{
          backgroundColor: isEditing ? "#f0f0f0" : "transparent",
          borderRadius: 1,
        }}
      />
      <IconButton onClick={onEditToggle} sx={{ ml: 1 }}>
        {isEditing ? (
          <Check
            onClick={() => onSave(newValue)}
            sx={{ color: "green" }}
          />
        ) : (
          <Edit />
        )}
      </IconButton>
    </Box>
  );
};

export default ProfilePage;
