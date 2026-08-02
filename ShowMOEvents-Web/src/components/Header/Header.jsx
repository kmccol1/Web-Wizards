//****************************************************************************************
// Filename: Header.jsx
// Date: 1 August 2026
// Author: Kyle McColgan
// Description: This file contains the Header component for ShowMOEvents.
//****************************************************************************************

import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/images/ShowMO.png';

import "./Header.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  const navItem = (path) => `nav-item ${isActive(path) ? "active" : ""}`;
  const navigation = [
    { to: "/", label: "Home" },
	{ to: "/search", label: "Search" },
	{ to: "/post", label: "Posts" },
	{ to: "/event", label: "Events" },
	{ to: "/about-us", label: "About" },
	{ to: "/contact-us", label: "Connect" },
  ];
  
    async function handleLogout(){
	  //Call global logout logic.
	  await logout(); //Redirect AFTER logout state is fully cleared.
	  navigate("/login", { replace: true }); 
  };
  
  //Close the dropdown menu when clicking outside the menu.
  useEffect(() => {
	  if (!menuOpen)
	  {
		  return;
	  }
	  
	  const handleClickOutside = (event) => {
		  if ((avatarRef.current) && (!avatarRef.current.contains(event.target)))
		  {
			  setMenuOpen(false);
		  }
	  };
	  
	  const handleEscape = (event) => {
		  if (event.key === "Escape")
		  {
			  setMenuOpen(false);
		  }
	  };
	  
	  document.addEventListener("mousedown", handleClickOutside);
	  document.addEventListener("keydown", handleEscape);
	  return () =>
	  {
		  document.removeEventListener("mousedown", handleClickOutside);
		  document.removeEventListener("keydown", handleEscape);
	  };
  }, [menuOpen]);
  
  return (
    <header className="header">
      <div className="header-inner">
	    <Link to="/" className="brand" aria-label="ShowMOEvents home">
          <img src={logo} alt="ShowMOEvents Logo" className="header-image" />
		  <span className="brand-title">ShowMOEvents</span>
		</Link>
		  {/* Primary Navigation. */}
		  <nav className="nav" aria-label="Primary Navigation">
		    {navigation.map(({ to, label }) => (
				<Link
				  key={to}
				  to={to}
				  className={navItem(to)}
				  aria-current={isActive(to) ? "page" : undefined}
				>
				  {label}
				</Link>
			))}
      </nav>
	  	{/* Right Side: Auth / User Avatar. */}
		  <div className="header-actions">
		   {user ? (
		    <div
			  ref={avatarRef}
			  className="avatar-wrapper"
			>
			  <button
			    type="button"
				className="avatar-button"
				aria-haspopup="menu"
				aria-expanded={menuOpen}
				aria-label="Open user menu"
				onClick={() => setMenuOpen((open) => !open)}
			  >
				  <div className="avatar">
					{user.username?.[0]?.toUpperCase() ?? "?"}
				  </div>
			  </button>
			  
			  <div
			    className={`menu ${menuOpen ? "open" : ""}`}
				role="menu"
			  >
			    <Link to="/profile" className="menu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
				  Profile
				</Link>
				<Link to="/settings" className="menu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
				  Settings
				</Link>
				<div className="menu-divider" />
				<button
				  type="button"
				  className="menu-item danger"
				  role="menuitem"
				  onClick={async () => {
					  setMenuOpen(false);
					  await handleLogout();
				  }}
				>
				  Log out
				</button>
			  </div>
			</div>
		) : (
		  <div className="auth-links">
		    <Link to="/login" className="button secondary">Login</Link>
		    <Link to="/register" className="button">Register</Link>
		  </div>
		)}
		</div>
	 </div>
    </header>
  );
};

export default Header;
