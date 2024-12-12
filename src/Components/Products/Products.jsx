import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../axiosInstance';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('/shopify-products')
      .then(response => {
        console.log("Fetched Products:", response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 bg-[#FBFAF4]">
      <div className="mb-4 mt-8">
        <h1 className="text-3xl font-semibold text-center text-[#24A5A8] font-inter">Our Products</h1>
        <p className="text-lg text-center text-[#473C3C] mt-2">
          Discover our exclusive collection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: index * 0.1,
                duration: 0.5,
              },
            }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <Link
              to={`/product/${product.id}`}
              className="group block p-4 rounded-lg transition-all duration-300 w-full sm:w-72 h-72"
            >
              <img
                src={product.images[0]?.src || 'default-image.jpg'}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
              />
              <h2 className="text-left text-sm font-normal text-black font-custom mt-4 hover:underline">
                {product.title || 'No Title'}
              </h2>
              <p className="text-left text-sm font-normal text-[#696969] mt-1 font-inter">
                EGP {product.variants[0]?.price || 'N/A'}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 flex justify-center">
        <button className="group relative h-12 w-36 overflow-hidden rounded-full bg-transparent text-black hover:text-white transition-colors duration-300">
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>View All</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:translate-x-1">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 12h15m0 0l-5.625-6m5.625 6l-5.625 6" />
            </svg>
          </span>
          <span className="absolute inset-0 z-0 bg-[#24A5A8] scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
        </button>
      </div>
    </div>
  );
};

export default ProductList;
