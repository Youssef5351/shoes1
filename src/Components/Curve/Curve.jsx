import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const routes = {
  "/": "• Home",
  "/cart": "• Cart",
};

const anim = (variants) => ({
  variants,
  initial: "initial",
  animate: "enter",
  exit: "exit"
});

const text = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: -100,
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: "47.5%" }
  },
  exit: {
    opacity: 1,
    top: "40%",
    transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] }
  }
};

const curve = (initialPath, targetPath) => ({
  initial: {
    d: initialPath
  },
  enter: {
    d: targetPath,
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    d: initialPath,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
  }
});

const translate = {
  initial: {
    top: "-300px"
  },
  enter: {
    top: "-100vh",
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      top: "100vh"
    }
  },
  exit: {
    top: "-300px",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
  }
};

const SVG = ({ height, width }) => {
  const initialPath = `
    M0 300 
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;
  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `;

  return (
    <motion.svg className="fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 z-[60]" {...anim(translate)}>
<motion.path {...anim(curve(initialPath, targetPath))} fill="#24A5A8" />
    </motion.svg>
  );
};

export default function Curve({ children, backgroundColor }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    setIsTransitioning(true);
  }, [location.pathname]);

  return (
    <div className="page curve" style={{ backgroundColor }}>
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className="fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 bg-black transition-opacity duration-0 delay-100 z-[80]"
      />
      <motion.p
        className="absolute left-1/2 top-[40%] text-white font-Inter text-[56px] z-[80] -translate-x-1/2 text-center"
        {...anim(text)}
      >
        {routes[location.pathname]}
      </motion.p>
      {dimensions.width != null && <SVG {...dimensions} />}
      <AnimatePresence
        onExitComplete={() => setIsTransitioning(false)}
      >
        <motion.div
          key={location.pathname}
          onAnimationStart={() => setIsTransitioning(true)}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}