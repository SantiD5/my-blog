// src/components/Footer.js

import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <hr />
      <div className="footer-content">
        <p>
          &copy;<span>{new Date().getFullYear()} </span> Designed and Developed by
          <span className="footer-marked"> Santiago Delgado</span>
          <br /> Built with{" "}
          <span className="footer-marked">React Js.</span> Hosted on
          <span className="footer-marked"> Vercel.</span>
          </p>
      </div>
    </footer>
  );
};
