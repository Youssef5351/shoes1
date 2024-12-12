import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import image1 from "../../assets/men1.jpg";
import image2 from "../../assets/women.png";
import image3 from "../../assets/kids1.jpg";

const ImageGallery = ({ images }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      y: 100 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="flex flex-wrap justify-center gap-6 bg-[#FBFAF1] pt-16"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative w-[100%] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] overflow-hidden shadow-lg cursor-pointer"
          variants={imageVariants}
        >
          <img
            src={image.src}
            alt={image.alt || `Image ${index + 1}`}
            className="w-full h-72 object-cover"
          />
          <motion.button
            className="absolute bottom-4 left-1/2 font-inter font-normal transform -translate-x-1/2 bg-white text-black border border-black py-4 px-[3.5rem] transition-colors duration-300 flex items-center justify-between w-full whitespace-nowrap"
            whileHover={{ 
              backgroundColor: "#000",
              color: "#FFF",
              transition: { duration: 0.2 }
            }}
          >
            <span className="flex-grow text-left">{image.buttonText}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="ml-auto"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 12h16m0 0l-6-6m6 6l-6 6"
              />
            </svg>
          </motion.button>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Links = () => {
  const images = [
    { src: image1, alt: "Just It 1", buttonText: "Men's Fashion" },
    { src: image2, alt: "Just It 2", buttonText: "Women's Fashion" },
    { src: image3, alt: "Just It 3", buttonText: "Kids' Fashion" },
  ];

  return <ImageGallery images={images} />;
};

export default Links;