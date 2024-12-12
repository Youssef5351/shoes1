import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../Whishlistcontext/Whishlistcontext';
import { CartContext } from '../CartContext/CartContext';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, openCart } = useContext(CartContext);
  const [hoveredStates, setHoveredStates] = useState({});

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
    openCart();
  };

  const setHoveredButton = (itemId, button) => {
    setHoveredStates(prev => ({
      ...prev,
      [itemId]: button
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <h1 className="text-2xl font-bold mb-8 text-center text-[#878787]">My Wishlist ({wishlistItems.length})</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link 
            to="/" 
            className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map(item => (
            <div 
              key={item.id} 
              className="relative overflow-hidden bg-white transition-all duration-300 group"
            >
                 <img 
        src={item.images[0]?.src || 'default-image.jpg'} // Handle missing image
        alt={item.title} 
        className="w-full h-auto mb-4 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
              
              <div className="absolute inset-0 bg-[#878787] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link 
                  to={`/product/${item.id}`}
                  className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out hover:scale-105 bg-white text-black font-normal py-2 px-4 w-36 h-12 rounded-full flex items-center justify-center"
                  onMouseEnter={() => setHoveredButton(item.id, 'quickView')}
                  onMouseLeave={() => setHoveredButton(item.id, null)}
                >
                  {hoveredStates[item.id] === 'quickView' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"/>
                        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/>
                      </g>
                    </svg>
                  ) : 'Quick View'}
                </Link>

                <button 
                  className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out hover:scale-105 bg-[#454602] text-white font-normal py-2 px-4 w-36 h-12 rounded-full flex items-center justify-center"
                  onMouseEnter={() => setHoveredButton(item.id, 'quickShop')}
                  onMouseLeave={() => setHoveredButton(item.id, null)}
                  onClick={(e) => handleAddToCart(e, item)}
                >
                  <span className={`transition-transform duration-300 ${hoveredStates[item.id] === 'quickShop' ? 'translate-y-[-10%]' : ''}`}>
                    {hoveredStates[item.id] === 'quickShop' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M0 1h4.764l.545 2h18.078l-3.666 11H7.78l-.5 2H22v2H4.72l1.246-4.989L3.236 3H0zm7.764 11h10.515l2.334-7H5.855zM4 21a2 2 0 1 1 4 0a2 2 0 0 1-4 0m14 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0"/>
                      </svg>
                    ) : 'Add to Cart'}
                  </span>
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 " 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                
                <p className="text-gray-600 text-lg font-semibold">
                  EGP {item.variants[0]?.price || 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}