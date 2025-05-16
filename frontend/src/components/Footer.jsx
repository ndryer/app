import React from 'react';
import { motion } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';

const Footer = ({ userData }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="end" className="bg-neutral-850 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-2 font-display">{userData.fullName}</h2>
            <p className="text-gray-400 font-light">{userData.bioLine}</p>
          </div>
          
          <div className="flex space-x-4">
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
                  style={{ height: 36, width: 36 }}
                  aria-label={`Visit ${link.name}`}
                  bgColor="#4f46e5"
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0 font-light text-sm">
            &copy; {currentYear} {userData.fullName}. All rights reserved.
          </p>
          <div className="text-gray-400">
            <a 
              href={`mailto:${userData.email}`}
              className="hover:text-primary-400 transition-colors duration-300 font-light"
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
