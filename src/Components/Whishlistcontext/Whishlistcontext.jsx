import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    // Load wishlist items from localStorage on initial render
    const savedItems = localStorage.getItem('wishlistItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const isInWishlist = (itemId) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  // Save wishlist items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item) => {
    setWishlistItems(prev => {
      if (!prev.find(i => i.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isWishlistOpen,
      setIsWishlistOpen,
      toggleWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);