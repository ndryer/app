import React, { useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import CopyToClipboard from 'react-copy-to-clipboard';
import { 
  Search, 
  Mail, 
  Clock, 
  Linkedin, 
  Github,
  X,
  Check
} from 'lucide-react';

interface CommandMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface CommandItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  keywords: string;
  action: () => void;
  component?: React.ReactNode;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, setIsOpen }) => {
  const [search, setSearch] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false);
  
  // Handle copy notification
  const handleCopyEmail = useCallback((): void => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1500);
  }, [setIsOpen]);
  
  // Scroll to section helper
  const scrollToSection = useCallback((id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  }, [setIsOpen]);
  
  // Open link in new tab helper
  const openLink = useCallback((url: string): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  }, [setIsOpen]);
  
  // Simplified commands array (removed resume and skills)
  const commands: CommandItem[] = [
    {
      id: 'email',
      name: 'Copy Email Address',
      icon: <Mail size={18} className="text-blue-500" />,
      keywords: 'contact mail reach',
      action: handleCopyEmail,
      component: (
        <CopyToClipboard text="nathan.dryer@example.com" onCopy={handleCopyEmail}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-blue-500" />
              <div className="flex flex-col">
                <span className="font-medium">Copy Email</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">nathan.dryer@example.com</span>
              </div>
            </div>
          </div>
        </CopyToClipboard>
      )
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Profile',
      icon: <Linkedin size={18} className="text-blue-500" />,
      keywords: 'social network professional connect',
      action: () => openLink('https://linkedin.com/in/nathan-dryer')
    },
    {
      id: 'github',
      name: 'GitHub Profile',
      icon: <Github size={18} className="text-blue-500" />,
      keywords: 'code repository projects source',
      action: () => openLink('https://github.com/nathan-dryer')
    },
    {
      id: 'timeline',
      name: 'View Experience Timeline',
      icon: <Clock size={18} className="text-blue-500" />,
      keywords: 'experience history career work jobs',
      action: () => scrollToSection('timeline')
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div 
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="w-full">
              <div className="flex items-center px-4 pt-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                <Search className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                <Command.Input 
                  value={search}
                  onValueChange={setSearch}
                  className="w-full py-2 bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-base font-medium"
                  placeholder="Find contact info or navigate..."
                  autoFocus
                />
                <button 
                  className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>

              {copied && (
                <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/30">
                  <div className="flex items-center text-blue-700 dark:text-blue-300">
                    <Check size={16} className="mr-2" />
                    <p className="text-sm font-medium">
                      Email copied to clipboard
                    </p>
                  </div>
                </div>
              )}

              <Command.List className="max-h-[300px] overflow-y-auto py-3">
                <Command.Empty className="py-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    No matching commands found
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                    Try a different search term
                  </p>
                </Command.Empty>
                
                {commands.map((command) => (
                  <Command.Item
                    key={command.id}
                    value={`${command.name.toLowerCase()} ${command.keywords}`}
                    onSelect={() => command.action()}
                    className="mx-2 px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200"
                  >
                    {command.component || (
                      <div className="flex items-center gap-3">
                        {command.icon}
                        <span className="font-medium">{command.name}</span>
                      </div>
                    )}
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
