import React from 'react';
import { motion } from 'framer-motion';
import shoe from '../../assets/Blue-shoe.png';

const LandingPage = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.8, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 20, delay: 0.8 },
    },
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="bg-[#FBFAF1] h-full w-full md:w-1/2 flex flex-col justify-center p-8 md:pl-24"
      >
        <motion.h2
          variants={textVariants}
          className="text-[#24A5A8] text-3xl md:text-5xl uppercase font-semibold font-contrail tracking-wide leading-normal"
        >
          Have A Life
        </motion.h2>

        <motion.div
          variants={textVariants}
          transition={{ delay: 0.2 }}
          className="mt-8 md:mt-12"
        >
          <motion.h1
            variants={textVariants}
            className="text-black text-4xl md:text-7xl font-contrail leading-[1.1]"
          >
            SHOES SPEAK LOUDER THAN WORDS
          </motion.h1>

          <motion.p
            variants={textVariants}
            transition={{ delay: 0.4 }}
            className="text-[#24A5A8] font-custom text-sm md:text-lg mt-3 leading-relaxed"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
            luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </motion.p>
        </motion.div>

        <motion.button
          variants={textVariants}
          transition={{ delay: 0.6 }}
          className="relative flex items-center justify-start w-12 mt-6 md:mt-9 h-12 rounded-full cursor-pointer overflow-hidden transition-all duration-300 bg-transparent border border-black hover:w-32 group"
        >
          <div className="flex items-center justify-center w-12 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path
                  strokeDasharray="20"
                  strokeDashoffset="20"
                  d="M3 12h17.5"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.2s"
                    values="20;0"
                  />
                </path>
                <path
                  strokeDasharray="12"
                  strokeDashoffset="12"
                  d="M21 12l-7 7M21 12l-7-7"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.2s"
                    dur="0.2s"
                    values="12;0"
                  />
                </path>
              </g>
            </svg>
          </div>
          <span className="absolute left-12 w-0 opacity-0 text-black text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 group-hover:w-16 group-hover:opacity-100">
            Find Out!
          </span>
        </motion.button>
      </motion.div>

      {/* Right Side (Image Slider) */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 h-full relative overflow-hidden bg-[#FBFAF1] flex justify-center items-center"
      >
        <motion.img
          variants={imageVariants}
          src={shoe}
          className="h-72 md:h-[40rem] drop-shadow-[0_10px_55px_rgba(0,0,0,0.7)]"
          alt="Shoe"
        />
      </motion.div>
    </div>
  );
};

export default LandingPage;
