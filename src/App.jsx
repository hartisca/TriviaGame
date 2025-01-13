import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './utils/AuthContext';
import PlayScreen from './pages/PlayScreen' 
import './App.css';
import Header from './components/ui/Header';
import HomeScreen from './pages/HomeScreen';
import Classification from './pages/ClassificationScreen';
import LoginScreen from './pages/LoginScreen';
import Notification from './components/ui/Notification';
import UserInfo from './pages/UserInfo';
import NotFound from './pages/NotFound';

function App() {  

  useEffect(() => {
   
  },[])

  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="contentWrap">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path='*' element={<NotFound />} />
            <Route path="/register" element={<LoginScreen />} />
            <Route path="/play" element={<PlayScreen />} />
            <Route path="/classification" element={<Classification />} />
            <Route path="/usersettings" element={<UserInfo />} />
          </Routes>
          <Notification />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

