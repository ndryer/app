import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxBanner } from 'react-scroll-parallax';

const Header = ({ userData }) => {
  return (
    <ParallaxBanner
      layers={[
        { speed: -20, expanded: false, children: (
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-750 to-neutral-850 opacity-95" />
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
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-xl"
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
            className="text-4xl md:text-5xl font-bold mb-2 font-display tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {userData.fullName}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-6 text-primary-300 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {userData.bioLine}
          </motion.p>
          
          <motion.div 
            className="text-base md:text-lg font-light text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="mb-1 flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {userData.location}
            </p>
            <p className="mb-1 flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {userData.phone}
            </p>
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {userData.email}
            </p>
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
          className="h-8 w-8 text-primary-400 cursor-pointer" 
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
