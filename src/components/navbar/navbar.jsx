import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSun } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { isAdmin } from "../../../server/middleware/Admin";
import { useAuth } from "../../context/authContext";
import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate()
  const {isAuthenticated,logOut} = useAuth()
  const handleSignOut = async()=>{
    try{
      await logOut()
      navigate('/')
    }catch(e){
      console.log(e)
    } 
  }

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleClick = (e) => {
    console.log(e.currentTarget);
    setOpen(!open);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common breakpoint for mobile
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <>
        <header className="bg-gray-800">
        <nav className="flex  justify-between p-4  items-center w-[80%] mx-auto">
        <div>
          <NavLink to={"/"} className="">
            <h1 className="text-xs md:text-2xl lg:text-3xl font-bold text-white tracking-wide">
              Delgado Blog
            </h1>
          </NavLink>
        </div>
        {open && isMobile ? (
          <div className="md:static absolute md:bg-gray-800 md:w-auto bg-black md:min-h-fit min-h-[30vh] left-0 top-[11%] w-full flex items-center px-5">
            <ul className="flex flex-col gap-6 text-center">
              <li>
                <NavLink href="/" className="text-white hover:text-gray-400">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={'/about'} className="text-white hover:text-gray-400">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to={'/blog'} className="text-white hover:text-gray-400">
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
        ) : null}
         <div>
          <ul className="md:flex items-center gap-4 hidden">
            <li>
              <NavLink to='/' className="text-white hover:text-gray-400">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={'/about'} className="text-white hover:text-gray-400">
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/'}
                className="text-white hover:text-gray-400 hover:cursor-pointer"
              >
                <FaSearch />
              </NavLink>
            </li>
            <li>
              <NavLink to={'/'}
                className="text-white hover:text-gray-400 hover:cursor-pointer"
              >
                <GoSun />
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex items-center p-4">
            <li>
              <NavLink to={'/'}
                className="hidden md:block text-white hover:text-gray-400 pr-5"
              >
                Subscribe
              </NavLink>
            </li>
            {
              !isAuthenticated ? ( <li>
                <NavLink to={'/signup'}
                  className="bg-black text-white px-5 py-2 rounded-full hover:bg-slate-600 mr-5 md:m-0"
                >
                  Sign up
                </NavLink>
              </li>) : ( <li>
                <div className="dropdown">
                <NavLink to={'#'}
                className="bg-black text-white px-5 py-2 rounded-full hover:bg-slate-600 mr-5 md:m-0"
              >
               Profile
              </NavLink>
              <div className="dropdown-content">
        <NavLink to="/account">My Account</NavLink>
        {
          isAdmin ?         <NavLink to="/dashboard">Dashboard</NavLink>
: null
        }
        <NavLink to="/bookmarks">My Bookmarks</NavLink>
        <NavLink onClick={handleSignOut} to="/logout">Sign Out</NavLink>
      </div>
                </div>
             
            </li>)
            }
           
            {open ? (
              <IoMdClose
                onClick={handleClick}
                className="text-3xl cursor-pointer text-white md:hidden"
              />
            ) : (
              <GiHamburgerMenu
                onClick={handleClick}
                className="text-3xl cursor-pointer text-white  md:hidden"
              />
            )
            }
          </ul>
        </div>
        </nav>
        
        </header>
          </>
  );
}
     