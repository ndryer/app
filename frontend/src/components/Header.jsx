import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ParallaxBanner } from 'react-scroll-parallax';
import CommandMenu from './CommandMenu';
import ScrollCue from './ScrollCue';

const Header = ({ userData, toggleTheme, darkMode }) => {
  return (
    <ParallaxBanner
      layers={[
        { speed: -20, expanded: false, children: (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-600 opacity-100">
            {/* Clean background without hexagon pattern */}
          </div>
        )},
      ]}
      className="relative h-screen flex items-center justify-center overflow-hidden pb-20 md:pb-32"
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
            <div className="power-button-logo">
              <div className="power-button-inner bg-gradient-to-r from-blue-400 to-blue-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-10 h-10">
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center text-white max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 font-sans"
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
              <p className="text-xl text-white font-light mb-6">
                {userData.bioLine}
              </p>
              
              {/* Command Menu - full width on mobile, max-w-md on desktop */}
              <div className="w-full">
                <CommandMenu 
                  userData={userData} 
                  toggleTheme={toggleTheme} 
                  darkMode={darkMode}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Cue */}
      <ScrollCue />
    </ParallaxBanner>
  );
};

export default Header;
