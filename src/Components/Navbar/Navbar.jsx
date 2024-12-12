import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from 'react-router-dom';
import zaf from "../../assets/zaf.png";
import { CartContext } from "../CartContext/CartContext";
import { useWishlist } from "../Whishlistcontext/Whishlistcontext";
import Wishlist from "../Wishlist/Wishlist";



export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef(null);
  const { toggleCart, cartItems } = useContext(CartContext);
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div 
        className={`
          fixed top-0 left-0 right-0 z-30
          transition-all duration-300 ease-in-out
          ${scrolled 
            ? 'mx-5 mt-5 bg-[#dad3d366] backdrop-blur-[45px] h-[90px] rounded-xl' 
            : 'h-32'}
        `}
      >
        <div className="h-full mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-full px-6">
            {/* Left section with equal width to right section */}
            <div className="flex items-center">
              {/* Add any left-side content here if needed */}
            </div>

            {/* Center logo section */}
            <div className="flex justify-start flex-1">
              <Link to="/">
                <img
                  src={zaf}
                  className={`w-20 h-20 rounded-full transition-all duration-500 ease-in-out
                  `}
                  alt="Logo"
                />
              </Link>
            </div>

            {/* Right icons section with fixed width */}
            <div className="flex items-center justify-end gap-4 w-32">
              {/* Wishlist Icon */}
              <Link 
                to="/wishlist"
                className="relative flex items-center justify-center w-8 h-8"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24"
                  className="transition-colors duration-300"
                >
                  <path 
                    fill="currentColor" 
                    d="M4.24 12.25a4.2 4.2 0 0 1-1.24-3A4.25 4.25 0 0 1 7.25 5c1.58 0 2.96.86 3.69 2.14h1.12A4.24 4.24 0 0 1 15.75 5A4.25 4.25 0 0 1 20 9.25c0 1.17-.5 2.25-1.24 3L11.5 19.5zm15.22.71C20.41 12 21 10.7 21 9.25A5.25 5.25 0 0 0 15.75 4c-1.75 0-3.3.85-4.25 2.17A5.22 5.22 0 0 0 7.25 4A5.25 5.25 0 0 0 2 9.25c0 1.45.59 2.75 1.54 3.71l7.96 7.96z"
                  />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <button 
                onClick={toggleCart}
                className="relative flex items-center justify-center w-8 h-8"
              >
                <ion-icon 
                  name="bag-outline" 
                  style={{ 
                    fontSize: '24px',
                    display: 'block'
                  }}
                ></ion-icon>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}