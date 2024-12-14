import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayScreen from './pages/PlayScreen' 
import './App.css';
import Header from './components/ui/Header';
import HomeScreen from './pages/HomeScreen';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

