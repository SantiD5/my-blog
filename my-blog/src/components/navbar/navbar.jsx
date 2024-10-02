import { FaGithub, FaSearch, FaTwitter } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { Link } from 'react-router-dom';
import './navbar.css';
export const Navbar = () => {
  return (
    <>
    <nav className='header-nav'>
      <ul className='nav-ul'>
        <div className="ul-left">
          <li className="ul-li">
          <Link className='links' to='/'>Home</Link>
          </li>
          <li className="ul-li">
          <Link className='links' to='/'>Blog</Link>
          </li>
          <li className="ul-li">
          <Link className='links' to='/'>Projects</Link>
          </li>
        </div>
        <div className="ul-right">
        <li className='ul-li'>
          <Link target="_blank" to='https://github.com/SantiD5/my-blog' className='nav-link' aria-label='Home'><FaGithub /></Link>
        </li>
        <li className='ul-li'>
          <Link to='/' className='nav-link' aria-label='Home'><FaTwitter/></Link>
        </li>
        <li className='ul-li'>
          <Link to='/' className='nav-link' aria-label='About Us'><FaSearch/></Link>
        </li>
        <li className='ul-li'>
          <Link to='/' className='nav-link' aria-label='Contact Us'><GoSun/></Link>
        </li>
        </div>
      </ul>
    </nav>
    </>
  );
}
