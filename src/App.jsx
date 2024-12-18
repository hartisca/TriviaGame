import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayScreen from './pages/PlayScreen' 
import './App.css';
import Header from './components/ui/Header';
import HomeScreen from './pages/HomeScreen';
import Classification from './pages/ClassificationScreen';

function App() {  

  useEffect(() => {
   
  },[])

  return (
    <Router>
      <Header />
      <div className="contentWrap">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/play" element={<PlayScreen />} />
          <Route path="/classification" element={<Classification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

