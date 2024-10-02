// App.jsx
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer.jsx';
import { Main } from './components/main/main.jsx';
import { Navbar } from './components/navbar/navbar.jsx';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/about" element={<Navbar />} />
        <Route path="/contact" element={<Navbar />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
