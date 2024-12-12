import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FBFAF1] text-black py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 font-inter">Our Company</h3>
          <p className="text-black text-sm font-inter">
            Delivering quality products and exceptional customer experience since 2024.
          </p>
          <div className="mt-4 flex space-x-4">
            {/* Social Media Icons */}
            <a href="#" className="text-black hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5.54 4.5 10.03 10 10.03 5.5 0 10-4.49 10-10.03C22 6.53 17.5 2.04 12 2.04zm4.33 6.5h-2.33c-.4 0-.67.33-.67.66V11h3l-.33 3h-2.34v7.34h-3.67v-7.34H6.67V11h2.33V8.5c0-2 1.33-3.5 3.33-3.5h2.33v2.54z"/>
              </svg>
            </a>
            <a href="#" className="text-black hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07c.54 1.74 2.12 3.01 4 3.04-1.48 1.17-3.33 1.86-5.35 1.86-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" className="text-black hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-black hover:text-black transition-colors">Home</a></li>
            <li><a href="#" className="text-black hover:text-black transition-colors">Shop</a></li>
            <li><a href="#" className="text-black hover:text-black transition-colors">About Us</a></li>
            <li><a href="#" className="text-black hover:text-black transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-black hover:text-black transition-colors">Shipping</a></li>
            <li><a href="#" className="text-black hover:text-black transition-colors">Returns</a></li>
            <li><a href="#" className="text-black hover:text-black transition-colors">FAQ</a></li>
            <li><a href="#" className="text-black hover:text-black transition-colors">Support</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
          <p className="text-black text-sm mb-4">Subscribe to our newsletter for special offers!</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center">
        <p className="text-black text-sm">
          © {currentYear} Your Company Name. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
 
export default Footer;