import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">User Management</h1>
        
        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <ul className={`menu ${isOpen ? "open" : ""}`}>
          <li><Link to="/add" className="menu-item">Add User</Link></li>
          <li><Link to="/list" className="menu-item">List Users</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
