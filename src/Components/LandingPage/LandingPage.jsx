import React,{useState} from 'react';
import { motion } from 'framer-motion';
import shoe from '../../assets/Blue-shoe.png';

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);

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

  const buttonVariants = {
    initial: { 
      background: '#24A5A8',
      rotate: 0,
      borderRadius: '0.5rem'
    },
    hover: {
      background: '#1E86A0',
      rotate: [0, -5, 5, -3, 3, 0],
      borderRadius: '1.5rem',
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    }
  };

  const arrowVariants = {
    initial: { 
      x: 0,
      rotate: 0
    },
    hover: {
      x: [0, 5, -5, 3, -3, 0],
      rotate: [0, 15, -15, 10, -10, 0],
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  const textSplitVariants = {
    initial: { 
      opacity: 1,
      x: 0
    },
    hover: {
      opacity: [1, 0.6, 1],
      x: [0, 5, -5, 3, -3, 0],
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        className="bg-[#FBFAF1] h-full w-full md:w-1/2 flex flex-col justify-center p-8 pt-32 md:pl-24 md:pt-0"
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
    className="mt-12 md:mt-12"
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
      className="text-[#24A5A8] font-custom text-sm md:text-lg mt-5 leading-relaxed"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
      luctus nec ullamcorper mattis, pulvinar dapibus leo.
    </motion.p>
  </motion.div>

  <motion.button
          transition={{ delay: 0.6 }}
          initial="initial"
          whileHover="hover"
          variants={buttonVariants}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center justify-center w-[60%] py-3 mt-6 md:mt-9 text-white font-medium cursor-pointer overflow-hidden group"
        >
          <motion.div 
            className="absolute inset-0 bg-[#24A5A8] z-0 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div 
            className="flex items-center justify-center mr-2 z-10 relative"
            variants={arrowVariants}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="stroke-current"
            >
              <motion.path
                initial={{ pathLength: 0, stroke: '#FFFFFF' }}
                animate={{ 
                  pathLength: 1, 
                  stroke: isHovered ? '#FFD700' : '#FFFFFF'
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                d="M3 12h17.5"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <motion.path
                initial={{ pathLength: 0, stroke: '#FFFFFF' }}
                animate={{ 
                  pathLength: 1, 
                  stroke: isHovered ? '#FFD700' : '#FFFFFF'
                }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2,
                  ease: "easeInOut"
                }}
                d="M21 12l-7 7M21 12l-7-7"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
          
          <motion.span 
            className="text-sm font-semibold whitespace-nowrap z-10 relative"
            variants={textSplitVariants}
          >
            Find Out!
          </motion.span>
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
