import { FaGithub, FaSearch, FaTwitter } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import './navbar.css';

export const Navbar = () => {
  return (
    <>
    <nav className='header-nav'>
      <ul className='nav-ul'>
        <div className="ul-left">
          <li className="ul-li">
            <NavLink className='links' to='/'>Home</NavLink>
          </li>
          <li className="ul-li">
            <NavLink className='links' to='/about'>About</NavLink>
          </li>
          <li className="ul-li">
            <NavLink className='links' to='/blog'>Blog</NavLink>
          </li>
        </div>
        <div className="ul-middle">
          <li className='ul-li'>
            <NavLink target="_blank" to='https://github.com/SantiD5/my-blog' className='nav-link' aria-label='GitHub'><FaGithub /></NavLink>
          </li>
          <li className='ul-li'>
            <NavLink to='/' className='nav-link'><FaTwitter /></NavLink>
          </li>
          <li className='ul-li'>
            <NavLink to='/' className='nav-link'><FaSearch /></NavLink>
          </li>
          <li className='ul-li'>
            <NavLink to='/' className='nav-link'><GoSun /></NavLink>
          </li>
        </div>
        <div className="ul-right">
          <li className="ul-li">
            <NavLink className="li-button">Subscribe</NavLink>
          </li>
          <li>
            <NavLink to='/login' className="links">Sign In</NavLink>
          </li>
        </div>
      </ul>
    </nav>
    </>
  );
}
