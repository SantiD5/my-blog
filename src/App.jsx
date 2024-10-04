// App.jsx
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer.jsx';
import { Main } from './components/main/main.jsx';
import { Navbar } from './components/navbar/navbar.jsx';
import { About } from './pages/About.jsx';
import { Login } from './pages/Login.jsx';
import { SignUp } from './pages/SignUp.jsx';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Navbar />} />
        <Route path='/signup' element={  <SignUp/> }/>
        <Route path='/login' element={  <Login/> }/>

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
