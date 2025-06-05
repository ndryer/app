import React, { useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Search, Mail, Clock, Linkedin, Github, X, Check } from 'lucide-react';

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

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [search, setSearch] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Handle copy notification - direct state updates for better UX
  const handleCopyEmail = useCallback((): void => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1500);
  }, [setIsOpen]);

  // Scroll to section helper - direct modal close for better UX
  const scrollToSection = useCallback(
    (id: string): void => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false); // Direct state update for modal close
      }
    },
    [setIsOpen]
  );

  // Open link in new tab helper - direct modal close for better UX
  const openLink = useCallback(
    (url: string): void => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsOpen(false); // Direct state update for modal close
    },
    [setIsOpen]
  );

  // Simplified commands array (removed resume and skills)
  const commands: CommandItem[] = [
    {
      id: 'email',
      name: 'Copy Email Address',
      icon: <Mail size={18} className='text-token-primary-500' />,
      keywords: 'contact mail reach',
      action: handleCopyEmail,
      component: (
        <CopyToClipboard
          text='nathan.dryer@example.com'
          onCopy={handleCopyEmail}
        >
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Mail size={18} className='text-token-primary-500' />
              <div className='flex flex-col'>
                <span className='font-medium'>Copy Email</span>
                <span className='text-xs text-token-tertiary'>
                  nathan.dryer@example.com
                </span>
              </div>
            </div>
          </div>
        </CopyToClipboard>
      ),
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Profile',
      icon: <Linkedin size={18} className='text-token-primary-500' />,
      keywords: 'social network professional connect',
      action: () => openLink('https://linkedin.com/in/nathan-dryer'),
    },
    {
      id: 'github',
      name: 'GitHub Profile',
      icon: <Github size={18} className='text-token-primary-500' />,
      keywords: 'code repository projects source',
      action: () => openLink('https://github.com/nathan-dryer'),
    },
    {
      id: 'timeline',
      name: 'View Experience Timeline',
      icon: <Clock size={18} className='text-token-primary-500' />,
      keywords: 'experience history career work jobs',
      action: () => scrollToSection('timeline'),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[15vh] sm:pt-[20vh]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(false)}
          role='dialog'
        >
          <motion.div
            className='margin-component-y relative w-full max-w-md overflow-hidden rounded-xl shadow-2xl bg-token-primary'
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <Command className='w-full'>
              <div className='flex items-center border-b px-4 pb-3 pt-4 border-token-primary'>
                <Search className='mr-3 h-4 w-4 text-token-tertiary' />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  className='placeholder-token-tertiary w-full bg-transparent py-2 text-base font-medium text-token-primary focus:outline-none'
                  placeholder='Find contact info or navigate...'
                  autoFocus
                />
                <button
                  className='rounded-md p-1.5 transition-colors text-token-tertiary hover:bg-interactive-secondary'
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>

              {copied && (
                <div className='border-b border-token-primary-100 bg-token-primary-50 px-4 py-3'>
                  <div className='flex items-center text-token-primary-700'>
                    <Check size={16} className='mr-2' />
                    <p className='text-sm font-medium'>
                      Email copied to clipboard
                    </p>
                  </div>
                </div>
              )}

              <Command.List className='max-h-[300px] overflow-y-auto py-3'>
                <Command.Empty className='py-8 text-center'>
                  <p className='font-medium text-token-tertiary'>
                    No matching commands found
                  </p>
                  <p className='mt-1 text-sm text-token-tertiary'>
                    Try a different search term
                  </p>
                </Command.Empty>

                {commands.map(command => (
                  <Command.Item
                    key={command.id}
                    value={`${command.name.toLowerCase()} ${command.keywords}`}
                    onSelect={() => command.action()}
                    className='mx-2 flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 text-token-secondary hover:bg-token-primary-50 hover:text-token-primary-700'
                  >
                    {command.component || (
                      <div className='flex items-center gap-3'>
                        {command.icon}
                        <span className='font-medium'>{command.name}</span>
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
