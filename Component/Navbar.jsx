import React from "react";
import { Link } from "react-scroll";
import "./Navbar.css";
export default function Navbar({ toggleDarkMode, darkMode }) {
  return (
    <nav className="navbar">
      <div className="logo bold">PortFolio</div>
      <ul className="nav-links">
        {["home", "about", "services", "projects", "experience", "contact"].map(
          (section) => (
            <li key={section}>
              <Link to={section} smooth duration={200}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          )
        )}
        {/* <li>
          <button className="dark-btn" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </li> */}
      </ul>
    </nav>
  );
}
