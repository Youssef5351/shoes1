import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext/CartContext'; // Import CartContext
import ShopifyCheckout from '../createCheckout/createCheckout'; // Import ShopifyCheckout

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  const [hoveredItemId, setHoveredItemId] = useState(null); // Track hovered item

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Handle checkout
  const handleCheckout = async () => {
    try {
      const checkoutData = await ShopifyCheckout(cartItems);
      // Redirect user to Shopify checkout URL
      window.location.href = checkoutData.url;
    } catch (error) {
      console.error('Checkout failed:', error.message);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <div className="cart-page p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-2xl font-medium mb-6 text-center sm:text-xl md:text-2xl">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          {/* Table for larger screens */}
          <div className="hidden sm:block">
            <table className="w-full text-left table-auto sm:text-sm md:text-base">
              <thead>
                <tr className='font-inter'>
                  <th className="pb-4 font-light">Product</th>
                  <th className="pb-4 font-light">Price</th>
                  <th className="pb-4 font-light">Quantity</th>
                  <th className="pb-4 font-light">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4 flex items-center">
                      {/* Image hover logic */}
                      <div
                        className="relative w-32 h-32 sm:w-44 sm:h-40 mr-4"
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                      >
                        <img
                          src={item.image || item.image?.src} // Use Shopify's image `src`
                          alt={item.name}
                          className="w-full h-full object-cover transition-opacity duration-500"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        {item.name}
                        <button onClick={() => removeFromCart(item.id)} className="ml-2 mt-2 sm:mt-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4zM6 6v14h12V6zm3 3h2v8H9zm4 0h2v8h-2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 text-black">EGP {item.price}</td>
                    <td className="">
                      <div className="quantity-selector max-w-28 flex items-center space-x-2 bg-white border pr-1 pl-6 py-1 rounded-md border-black">
                        <button
                          className="px-1 py-1 rounded"
                          onClick={() =>
                            addToCart({ ...item, quantity: item.quantity > 1 ? -1 : 1 })
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="px-1 py-1 rounded "
                          onClick={() => addToCart({ ...item, quantity: 1 })}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4">EGP {item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* List format for smaller screens */}
          <div className="block sm:hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center border-b py-4">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div
                    className="relative w-32 h-32 sm:w-44 sm:h-40 mr-4"
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                  >
                    <img
                      src={item.image || item.image?.src} // Use Shopify's image `src`
                      alt={item.name}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                  </div>
                  <div>
                    <p>{item.name}</p>
                    <p className="text-black">EGP {item.price}</p>
                    <div className="quantity-selector max-w-28 flex items-center space-x-2 bg-white border pr-1 pl-6 py-1 rounded-md border-black mt-2">
                      <button
                        className="px-1 py-1 rounded"
                        onClick={() =>
                          addToCart({ ...item, quantity: item.quantity > 1 ? -1 : 1 })
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-1 py-1 rounded "
                        onClick={() => addToCart({ ...item, quantity: 1 })}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="ml-2 mt-2 sm:mt-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4zM6 6v14h12V6zm3 3h2v8H9zm4 0h2v8h-2z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="subtotal mt-6 text-right sm:text-center md:text-right">
        <p className="text-xl font-semibold">SUBTOTAL: EGP {calculateSubtotal()}</p>

        {/* Checkout button */}
        <button
          onClick={handleCheckout}
          className="mt-4 px-10 py-2 bg-[#fce477] text-black rounded-md sm:px-6"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
