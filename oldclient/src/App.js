import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Wardrobe from './pages/Wardrobe';
import Recycle from './pages/Recycle';
import Shop from './pages/Shop';
import Upload from './pages/Upload';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/recycle" element={<Recycle />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
