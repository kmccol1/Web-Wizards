//****************************************************************************************
// Filename: App.jsx
// Date: 1 August 2026
// Author: Kyle McColgan
// Description: This file contains the entry point for ShowMOEvents.
//****************************************************************************************

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from "./components/auth/PrivateRoute";

import Header from './components/Header/Header';
import PostsPage from './pages/PostsPage/PostsPage';
import EventsPage from './pages/EventsPage';
import UserProfile from './UserProfile';
import EventSearch from './components/EventSearch/EventSearch';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Home from './components/Home/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

import "./App.css";

const App = () =>
{
	return (
        <BrowserRouter>
		  <div className="app-shell">
		    <div className="app-background">
			  <div className="ambient ambient-primary" />
			  <div className="ambient ambient-secondary" />
			</div>
			<div className="app">
			  <Header />
			  <main className="main">
                <Routes>
                {/* 1. Public Routes. */}
                <Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/contact-us" element={<ContactUs />} />
				
				{/* 2. Protected Routes. */}
				<Route path="/post" element={<PrivateRoute element={<PostsPage />} />} />
				<Route path="/event" element={<PrivateRoute element={<EventsPage />} />} />
				<Route path="/profile" element={<PrivateRoute element={<UserProfile />} />} />
				<Route path="/search" element={<PrivateRoute element={<EventSearch />} />} />
				<Route path="/settings" element={<PrivateRoute element={<Settings />} />} />

                {/* 3. Fallback Route. */}
				<Route
					path="*"
					element={
						<section className="not-found page page-centered fade-in">
						  <h1 className="page-title">404</h1>
						  <h2>Page not found</h2>
						  <p className="page-subtitle">
						    The page you're looking for does not exist or may have been moved.
						  </p>
						</section>
					}
				  />
            </Routes>
		  </main>
		 </div>
		</div>
       </BrowserRouter>
    );
};

export default App;
