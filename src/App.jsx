import { useEffect } from 'react';
import PlayScreen from './pages/PlayScreen' 
import './App.css';
import Header from './components/ui/Header';

function App() {  

  useEffect(() => {
   
  },[])

  return (
    <>
      <Header />
      <div className='contentWrap'>
        <PlayScreen />
      </div>      
    </>
  );
}

export default App;

