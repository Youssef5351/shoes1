import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { CartContext } from '../CartContext/CartContext';
import { useWishlist } from '../Whishlistcontext/Whishlistcontext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart, openCart } = React.useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

useEffect(() => {
  axiosInstance.get(`/api/products/${id}`)
    .then(response => {
      console.log("Fetched Product Details:", response.data);
      const productData = response.data;
      
      setProduct(productData);
      setSelectedImage(productData.images[0]?.src || 'default-image.jpg');
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching product details:', error);
      setError('Failed to load product details. Please try again later.');
      setLoading(false);
    });
}, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      variantId: product.variants[0]?.id,
      name: product.title,
      price: product.variants[0]?.price || 0,
      quantity,
      image: product.images[0]?.src || '',
    });
    openCart();
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-xl">No product found</div>
      </div>
    );
  }

  const productInWishlist = isInWishlist(product.id);

  return (
    <div className="product-detail-container flex flex-col md:flex-row gap-8 p-4 md:p-8">
      {/* Image List Section */}
      <div className="product-images md:w-1/6 flex flex-col space-y-4">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Product thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(image.src)}
            className={`thumbnail ${selectedImage === image.src ? 'selected' : ''}`}
          />
        ))}
      </div>

      {/* Main Product Image */}
      <div className="product-main-image md:w-3/4">
        <img
          src={selectedImage || 'default-image.jpg'}
          alt="Selected product"
          className="w-full rounded-lg"
        />
      </div>

      {/* Product Information Section */}
      <div className="product-info md:w-3/4 space-y-4 mt-32">
        <h1 className="text-4xl font-normal">{product.title}</h1>
        <p className="text-xl font-normal">EGP {product.variants[0]?.price || 'N/A'}</p>
        
        <div 
          className="text-xl text-black" 
          dangerouslySetInnerHTML={{ __html: product.body_html || '' }} 
        />

        <div className="quantity-and-cart flex flex-col gap-4">
          <div className="flex items-center space-x-4">
            <label className="quantity__label form__label" htmlFor="quantity-input">
              Quantity
            </label>
            <div className="quantity-selector flex items-center space-x-2 bg-white border px-7 py-1 rounded-md border-black">
              <button
                className="px-3 py-1 rounded text-lg"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span id="quantity-input">{quantity}</span>
              <button
                className="px-3 py-1 rounded"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button 
            className="bg-[#fce477] w-[60%] text-black px-6 py-2 rounded-xl font-inter"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          className={`border-1 border-black px-2 py-2 rounded-full flex items-center justify-center transition-colors duration-300 ${productInWishlist ? 'bg-yellow-500 text-black' : 'bg-transparent'}`}
          onClick={handleWishlistToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${productInWishlist ? 'text-white' : 'text-black'}`} 
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
