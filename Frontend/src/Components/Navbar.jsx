import React, { useState, useEffect } from "react";
import { FiSearch, FiUser, FiMapPin, FiCheck, FiX } from "react-icons/fi";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { url } from "../utils/constant";
import { clearAuth, setLocation } from "../Redux/authSlice";
import axios from "axios";

function NavBar({ setShowLogin }) {
  const { token, user, location } = useSelector(store => store.auth);  
  let admin = false;
  if (user && user.userType == "pgOwner") {
    admin = true;
  }
  
  const [searchQuery,setSearchQuery]=useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
        navigate(`/search?query=${searchQuery}`);
        setSearchQuery("");
        setIsSearchOpen(false);
    }
  };
  const handleLogout = async () => {
    const newUrl = url + "/auth/logout";
    try {
      const res = await axios.post(newUrl);
      localStorage.removeItem("token");
      dispatch(clearAuth());
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const handleLocationIconClick = () => {
    setIsLocationOpen(!isLocationOpen);
  };

  const handleLocationSubmit = () => {
    if (locationInput) {
      dispatch(setLocation(locationInput));
      setIsLocationOpen(false);
      setLocationInput("");
    }
  };
  

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isSearchOpen,location]);
  return (
    <div className="relative">
      <nav className="bg-gradient-to-r from-blue-200 to-white py-3 px-6 shadow-md fixed top-0 left-0 w-full z-30">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-2xl tracking-wide font-normal text-blue-600">
              <Link to="/">StayNearU</Link>
            </div>
            <ul className="flex space-x-12 text-lg font-medium">
              <Link to="/" className="font-normal text-base hover:text-blue-600 cursor-pointer transition-colors duration-300">Home</Link>
              {admin ? (
                <>
                  <Link to="/admin/dashboard" className="font-normal text-base hover:text-blue-600 cursor-pointer transition-colors duration-300">Dashboard</Link>
                  <Link to="/admin/add" className="font-normal text-base hover:text-blue-600 cursor-pointer transition-colors duration-300">Add PG</Link>
                </>
              ) : (
                <>
                  <Link to="/explore" className="font-normal text-base hover:text-blue-600 cursor-pointer transition-colors duration-300">Explore</Link>
                  <Link to="/myPG" className="font-normal text-base hover:text-blue-600 cursor-pointer transition-colors duration-300">My PG</Link>
                  <Link to="/user/bookings" className="font-normal text-base hover:text-blue-600 cursor-pointer transition-colors duration-300">My Bookings</Link>
                  <Link to='/about' className="font-normal text-base hover:text-blue-600 cursor-pointer transition-colors duration-300">About</Link>
                </>
              )}
            </ul>
          </div>
          <div className="flex items-center space-x-6">
            <button
              className="text-blue-600 p-2 rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              onClick={toggleSearch}
            >
              <FiSearch className="text-xl" />
            </button>
            {!admin && (
              <>
                {location && (
                  <span className="nav-link">{location}</span>
                )}
                <button
                  className="text-blue-600 p-2 rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  onClick={handleLocationIconClick}
                >
                  <FiMapPin className="text-xl" />
                </button>
                {isLocationOpen && (
                  <div className="relative">
                    <input
                      type="text"
                      className="transition-all duration-300 transform origin-left border border-blue-600 p-2 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                      placeholder="Enter location..."
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                    />
                    <button
                      onClick={handleLocationSubmit}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-blue-600"
                    >
                      <FiCheck className="text-xl" />
                    </button>
                  </div>
                )}
              </>
            )}
            {user && (
              <NavLink to="#" className="nav-link">Hello, {user.name}</NavLink>
            )}
            {!token ? (
              <Link to="/login" onClick={() => { setShowLogin(true); }} className="text-blue-600 border-2 border-blue-600 px-4 py-1 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-300">
                Login
              </Link>
            ) : (
              <Link onClick={handleLogout} className="text-blue-600 border-2 border-blue-600 px-4 py-1 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-300">
                Logout
              </Link>
            )}

            <div className="relative group">
              {token ? (
                <img
                  src={assets.mens}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              ) : (
                <FiUser className="text-2xl text-blue-600" />
              )}
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link to="/user/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                <Link to="/user/bookings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Bookings</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`absolute w-1/3 left-0 right-0 bg-white shadow-lg p-4 mt-24 mx-auto rounded-lg z-20 transition-all duration-300 transform ${
          isSearchOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
          <button
            className="ml-4 text-blue-600 p-2 rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            onClick={handleSearch}
          >
            <FiSearch className="text-xl" />
          </button>
          <button
            className="ml-4 text-blue-600 p-2 rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            onClick={toggleSearch}
          >
            <FiX className="text-xl"/>
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10"></div>
      )}
    </div>
  );
}

export default NavBar;
