import React from 'react';
import { motion } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';

const Footer = ({ userData }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="end" className="bg-dark-700 dark:bg-dark-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold mb-2 font-display">{userData.fullName}</h2>
            <p className="text-gray-400 text-sm">{userData.bioLine}</p>
          </div>
          
          <div className="flex space-x-4 mb-8">
            {userData.socialLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <SocialIcon 
                  url={link.url}
                  className="transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ height: 32, width: 32 }}
                  aria-label={`Visit ${link.name}`}
                  bgColor="var(--color-accent)"
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-4 pt-4 flex flex-col items-center">
          <p className="text-gray-500 mb-2 text-xs">
            &copy; {currentYear} {userData.fullName}. All rights reserved.
          </p>
          <div className="text-gray-400">
            <a 
              href={`mailto:${userData.email}`}
              className="text-sm hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              {userData.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
