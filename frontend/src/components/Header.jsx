import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxBanner } from 'react-scroll-parallax';

const Header = ({ userData }) => {
  return (
    <ParallaxBanner
      layers={[
        { speed: -20, expanded: false, children: (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 opacity-90" />
        )},
      ]}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      id="top"
    >
      <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={userData.photoUrl} 
              alt={userData.fullName} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 text-center md:text-left text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {userData.fullName}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {userData.bioLine}
          </motion.p>
          
          <motion.div 
            className="text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="mb-1">{userData.location}</p>
            <p className="mb-1">{userData.phone}</p>
            <p>{userData.email}</p>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-white cursor-pointer" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll down to timeline"
          role="button"
          tabIndex={0}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </ParallaxBanner>
  );
};

export default Header;
