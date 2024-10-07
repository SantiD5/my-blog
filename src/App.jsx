// App.jsx
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer.jsx';
import { Main } from './components/main/main.jsx';
import { Navbar } from './components/navbar/navbar.jsx';
import { AuthProvider } from './context/authContext.jsx';
import { BlogProvider } from './context/blogContext.jsx';
import { About } from './pages/About.jsx';
import { Login } from './pages/Login.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { Blog } from './pages/blog.jsx';
import { Blogs } from './pages/blogs.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import { ProtectedRoutes } from './protectedRoutes.jsx';
function App() {
  return (
    <AuthProvider>
      <BlogProvider>

       <Navbar />
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/about" element={<About />} />
        <Route path="/gblogs/:id" element={<Blog />} />

        <Route path="/contact" element={<Navbar />} />
        <Route path='/signup' element={  <SignUp/> }/>
        <Route path='/login' element={  <Login/> }/>
        <Route path='/gblogs' element={  <Blogs/> }/>

        <Route element={<ProtectedRoutes/>}>
          <Route path="/blogs/" element={<Dashboard />} />

        </Route>
      </Routes>
      <Footer/>
      </BlogProvider>
    </AuthProvider>
    
     
    
  );
}

export default App;
