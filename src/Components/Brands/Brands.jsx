import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bestseller1 from "../../assets/bestseller1.png"
import bestseller2 from "../../assets/bestseller2.png"
import bestseller3 from "../../assets/bestseller3.png"
import bestseller4 from "../../assets/bestseller4.png"
import bestseller5 from "../../assets/bestseller5.png"

const BaseArrow = ({ 
  direction = 'right', 
  showArrows = false, 
  className = '', 
  style = {}, 
  onClick 
}) => {
  if (!showArrows) return null;

  return (
    <div
      className={`
        ${className} 
        absolute 
        top-1/2 
        -translate-y-1/2 
        ${direction === 'right' ? 'right-2' : 'left-2'} 
        z-20 
        cursor-pointer 
        bg-white/50 
        hover:bg-white/75 
        rounded-full 
        p-2 
        shadow-md 
        transition-all 
        duration-300 
        group
      `}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="1.5em" 
        height="1.5em" 
        viewBox="0 0 24 24"
        className="text-gray-700 group-hover:text-black transition-colors"
      >
        {direction === 'right' ? (
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4.5 12h15m0 0l-5.625-6m5.625 6l-5.625 6"
          />
        ) : (
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M20 12H4m0 0l6-6m-6 6l6 6"
          />
        )}
      </svg>
    </div>
  );
};

const NextArrow = (props) => <BaseArrow direction="right" {...props} />;
const PrevArrow = (props) => <BaseArrow direction="left" {...props} />;

const BestSelling = () => {
  const [showArrows, setShowArrows] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow showArrows={showArrows} />,
    prevArrow: <PrevArrow showArrows={showArrows} />,
  };

  const brands = [
    { img: bestseller2, name: "Jordan Max Aura 5" },
    { img: bestseller1, name: "Jordan Max Aura 6" },
    { img: bestseller4, name: "Jordan Flight Club '91" },
    { img: bestseller3, name: "Jordan Spizike Low" },
    { img: bestseller5, name: "Luka 3 'Blurred Vision'" },
  ];

  return (
    <div
      className="bg-[#FBFAF1] py-12 px-6 relative overflow-hidden"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#990B15] font-inter mb-4">
          Top Sellers
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Discover our exclusive collection of best-selling sneakers, carefully curated for style and performance.
        </p>
      </div>
      
      <Slider {...settings}>
        {brands.map((brand, index) => (
          <div key={index} className="px-4 outline-none">
            <div className="group relative bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="relative">
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold mb-1">{brand.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSelling;