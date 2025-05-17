import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxBanner } from 'react-scroll-parallax';

const Header = ({ userData }) => {
  return (
    <ParallaxBanner
      layers={[
        { speed: -20, expanded: false, children: (
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 opacity-100">
            {/* Hexagon Pattern - created with multiple divs */}
            <div className="hexagon-pattern">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="hexagon"></div>
              ))}
            </div>
          </div>
        )},
      ]}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      id="top"
    >
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="profile-circle">
              <img 
                src={userData.photoUrl} 
                alt={userData.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center text-white max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-4 font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {userData.fullName}
            </motion.h1>
            
            <motion.div
              className="flex flex-col items-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-xl text-white font-light">
                {userData.bioLine}
              </p>
              
              <motion.a
                href="/nathan_dryer_resume.pdf"
                download="Nathan_Dryer_Resume.pdf"
                className="modern-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <motion.div 
          className="scroll-down-circle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-label="Scroll down to timeline"
            role="button"
            tabIndex={0}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </ParallaxBanner>
  );
};

export default Header;
