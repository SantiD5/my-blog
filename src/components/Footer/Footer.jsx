// src/components/Footer.js
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-[80%]">
        {/* Newsletter Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Delgado Santiago</h2>
          <p className="mb-2">Be as kind to yourself as you are to .</p>
          <p className="mb-4">
            Subscribe to my free newsletter for updates on new content!
          </p>
          <form className=" items-center ">
            <input
              type="email"
              placeholder="email@example.com"
              className=" bg-gray-800 rounded-lg text-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="m-0 bg-yellow-400 text-black rounded-lg">
              Subscribe
            </button>
          </form>
        </div>

        {/* Browse by Category */}
        <div>
          <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                CSS
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Animation
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Career
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                React
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                JavaScript
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Next.js
              </a>
            </li>
          </ul>
        </div>

        {/* Popular Blogs */}
        <div>
          <h2 className="text-xl font-bold mb-4">Popular blogs</h2>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                CSS for JavaScript Devs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                The Joy of React
              </a>
            </li>
          </ul>
        </div>

        {/* General Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">General</h2>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                About Santiago
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About This Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-xs max-w-7xl mx-auto px-4 mt-8 border-t border-gray-600 pt-8 text-gray-400">
        <div className="flex justify-between items-center">
          <p>
            &copy;<span>{new Date().getFullYear()} </span> Designed and
            Developed by Santiago Delgado. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Code of Conduct
            </a>
          </div>
        </div>
        <div className="flex justify-center space-x-6 mt-4 text-gray-500">
          <Link
            to={"https://github.com/SantiD5"}
            target="_blank"
            className="hover:text-white text-xl"
          >
            <FaGithub />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/santiagodelgadodev/"}
            target="_blank"
            className="hover:text-white text-xl"
          >
            <FaLinkedin />
          </Link>
          <Link
            to={"https://x.com/StdAgent1"}
            target="_blank"
            className="hover:text-white text-xl"
          >
            <FaTwitter />
          </Link>
        </div>
      </div>
    </footer>
  );
};
