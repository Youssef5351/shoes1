import React, { useContext, useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CartContext } from '../CartContext/CartContext';
import ShopifyCheckout from '../createCheckout/createCheckout'; // Import ShopifyCheckout
import { motion } from 'framer-motion'; // Import Framer Motion

const SideCart = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart, setCartItems } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize navigate


  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  useEffect(() => {
    console.log('Cart Items:', cartItems); // Check if items update
  }, [cartItems]);

  if (!isCartOpen) return null; // Hide cart when not open

  const increaseQuantity = (productId) => {
    console.log('Increasing quantity for product:', productId);
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      console.log('New cart items after increase:', newItems);
      return newItems;
    });
  };

  const decreaseQuantity = (productId) => {
    console.log('Decreasing quantity for product:', productId);
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      console.log('New cart items after decrease:', newItems);
      return newItems;
    });
  };

  // Function to truncate the product name
  const truncateName = (name, maxLength = 15) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    setIsCheckoutLoading(true);
  
    try {
      // More comprehensive network check
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network.');
      }
  
      // Validate cart items
      if (!cartItems.every(item => item.variantId)) {
        throw new Error('Some cart items are missing variant information.');
      }
  
      const checkoutResponse = await ShopifyCheckout(cartItems);
      
      console.log('Checkout Response:', checkoutResponse);
  
      if (checkoutResponse.url) {
        window.location.href = checkoutResponse.url;
      } else {
        throw new Error('No checkout URL generated');
      }
    } catch (error) {
      console.error('Comprehensive Checkout Error:', error);
      
      // Detailed error messaging
      switch(true) {
        case error.message.includes('No internet connection'):
          alert('No internet connection. Please check your network and try again.');
          break;
        case error.message.includes('missing variant information'):
          alert('There was an issue with your cart items. Please refresh and try again.');
          break;
        case error.message.includes('Failed to fetch'):
          alert('Unable to connect to the checkout service. Please check your internet connection.');
          break;
        default:
          alert(`Checkout failed: ${error.message}`);
      }
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay that darkens the screen */}
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        initial={{ opacity: 0 }} // Start fully transparent
        animate={{ opacity: isCartOpen ? 1 : 0 }} // Fade in when cart opens
        exit={{ opacity: 0 }} // Fade out when cart closes
        onClick={closeCart} // Close the cart if overlay is clicked
      />

      {/* Side Cart */}
      <motion.div 
  className="side-cart fixed top-0 right-0 w-96 h-full bg-[#FBFAF1] shadow-lg p-4 z-50 flex flex-col"
  initial={{ x: '100%' }} // Start outside the screen
  animate={{ x: isCartOpen ? 0 : '100%' }} // Slide in when open
  exit={{ x: '100%' }} // Slide out when closed
  transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Smooth spring animation
>

        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-base font-medium font-custom">SHOPPING CART</h2>
          <button onClick={closeCart} className="text-2xl">&times;</button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto mt-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <div className="flex items-center">
                  {/* Product Image */}
                  <img 
    src={item.image || 'https://via.placeholder.com/150'} 
    alt={item.name} 
    className="w-20 h-20 object-cover"
  />

          
                  {/* Product Details */}
                  <div className="ml-4">
                    <p className="font-normal">{truncateName(item.name)}</p>
                    <p className="text-sm text-gray-500">EGP {item.price}</p>
                    
                    {/* Quantity Controls */}
                    <div className="mt-2 flex items-center">
                      <div className="mx-2 border rounded-full px-2 flex items-center">
                        <button onClick={() => decreaseQuantity(item.id)} className="px-1">-</button>
                        <span className="px-2">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="px-1">+</button>
                      </div>
                    </div>
          
                    {/* Delete Icon under Product */}
                    <div className="mt-2">
                      <button onClick={() => removeFromCart(item.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className='text-lg ml-9' viewBox="0 0 24 24"><path fill="currentColor" d="M10 5h4a2 2 0 1 0-4 0M8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75m-7.516 9.467a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033L18.424 6.5H5.576z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          )}
        </div>

        {/* Subtotal and Checkout */}
        <div className="pt-4 border-t">
          <div className="flex justify-between text-lg font-semibold">
            <p>Subtotal:</p>
            <p>EGP {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
          </div>
          
          {/* View Cart Button */}
          <button
            className="mt-4 w-full bg-[#f7f7f7] text-black py-2 rounded-full font-custom"
            onClick={() => {
              closeCart();
              navigate('/cart')
            }} // Redirect to /cart page
          >
            View Cart
          </button>
          <button
            className={`mt-4 w-full py-2 rounded-full font-custom ${isCheckoutLoading ? 'bg-gray-400' : 'bg-black text-white'}`}
            onClick={handleCheckout}
            disabled={isCheckoutLoading}
          >
            {isCheckoutLoading ? 'Processing...' : 'Checkout'}
          </button>
        
        </div>
      </motion.div>
    </>
  );
};

export default SideCart;
