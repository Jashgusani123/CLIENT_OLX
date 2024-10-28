import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Correctly import BrowserRouter
import './App.css';
import styled from 'styled-components';
import Home from './Components/Layout/Home';
import ItemDetailPage from './Components/Shared/ItemDetailPage';
import ChatPage from './Components/Shared/ChatPage';
import NotificationPage from './Components/Shared/NotificationPage';
import FavoritePage from './Components/Shared/FavoritePage';
import ProfilePage from './Components/Shared/ProfilePage';
import SellPage from './Components/Shared/SellPage';
import LoginPage from './Components/Shared/LoginPage';
import SignUpPage from './Components/Shared/SignUpPage';
import {AuthProvider} from './Context/AllContext'

const BodyStyle = styled.div`
  margin: 0;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

function App() {
  
  return (
    <Router> 
      <AuthProvider>
      <BodyStyle>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item-detail" element={<ItemDetailPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BodyStyle>
      </AuthProvider>
    </Router>
  );
}

export default App;
