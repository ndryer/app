// ◀︎ LLM-modified - Enhanced font rendering for crisp text display on glassmorphism backgrounds, increased minimum font sizes for better readability, and applied text rendering optimizations
import React, { useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Mail, Download, Eye, Code, Linkedin, Github, X, Check } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

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
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Focus trap for modal accessibility
  const focusTrapRef = useFocusTrap({
    isActive: isOpen,
    restoreOnCleanup: true
  });

  // Handle copy notification - direct state updates for better UX
  const handleCopyEmail = useCallback((): void => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1500);
  }, [setIsOpen]);

  // Scroll to section helper with 180ms delay and proper onDismiss behavior
  const scrollToSection = useCallback(
    (id: string): void => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          setIsOpen(false); // Use 180ms delay for consistent UX
        }, 180);
      }
    },
    [setIsOpen]
  );

  // Download resume helper with error handling and proper onDismiss behavior
  const handleDownloadResume = useCallback((): void => {
    try {
      const link = document.createElement('a');
      link.href = '/downloads/Resume.pdf';
      link.download = 'Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setIsOpen(false); // Use 180ms delay for consistent UX
      }, 180);
    } catch (error) {
      console.error('Failed to download resume:', error);
      // Still close the menu even if download fails
      setTimeout(() => {
        setIsOpen(false);
      }, 180);
    }
  }, [setIsOpen]);

  // Open link in new tab helper with 180ms delay and proper onDismiss behavior
  const openLink = useCallback(
    (url: string): void => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setTimeout(() => {
        setIsOpen(false); // Use 180ms delay for consistent UX
      }, 180);
    },
    [setIsOpen]
  );

  // Structured command groups for organized layout
  const commandGroups: {
    resume: CommandItem[];
    navigate: CommandItem[];
    contact: CommandItem[];
  } = {
    resume: [
      {
        id: 'resume',
        name: 'Download Resume',
        icon: (
          <Download
            style={{
              width: 'var(--token-size-icon-responsive)',
              height: 'var(--token-size-icon-responsive)',
              color: 'var(--token-command-text)'
            }}
          />
        ),
        keywords: 'resume cv download pdf',
        action: handleDownloadResume,
      },
    ],
    navigate: [
      {
        id: 'experience',
        name: 'View Timeline',
        icon: (
          <Eye
            style={{
              width: 'var(--token-size-icon-responsive)',
              height: 'var(--token-size-icon-responsive)',
              color: 'var(--token-command-text)'
            }}
          />
        ),
        keywords: 'experience timeline history career work jobs',
        action: () => scrollToSection('timeline'),
      },
      {
        id: 'skills',
        name: 'View Skills',
        icon: (
          <Code
            style={{
              width: 'var(--token-size-icon-responsive)',
              height: 'var(--token-size-icon-responsive)',
              color: 'var(--token-command-text)'
            }}
          />
        ),
        keywords: 'skills expertise abilities technologies',
        action: () => scrollToSection('skills'),
      },
    ],
    contact: [
      {
        id: 'email',
        name: 'Copy Email',
        icon: (
          <Mail
            style={{
              width: 'var(--token-size-icon-responsive)',
              height: 'var(--token-size-icon-responsive)',
              color: 'var(--token-command-text)'
            }}
          />
        ),
        keywords: 'contact mail reach',
        action: handleCopyEmail,
      },
      {
        id: 'linkedin',
        name: 'LinkedIn Profile',
        icon: (
          <Linkedin
            style={{
              width: 'var(--token-size-icon-responsive)',
              height: 'var(--token-size-icon-responsive)',
              color: 'var(--token-command-text)'
            }}
          />
        ),
        keywords: 'social network professional connect',
        action: () => openLink('https://linkedin.com/in/nathan-dryer'),
      },
      {
        id: 'github',
        name: 'GitHub Profile',
        icon: (
          <Github
            style={{
              width: 'var(--token-size-icon-responsive)',
              height: 'var(--token-size-icon-responsive)',
              color: 'var(--token-command-text)'
            }}
          />
        ),
        keywords: 'code repository projects source',
        action: () => openLink('https://github.com/nathan-dryer'),
      },
    ],
  };

  // Flatten all commands for keyboard navigation - Navigate first, then Resume
  const allCommands = [
    ...commandGroups.navigate,
    ...commandGroups.resume,
    ...commandGroups.contact,
  ];

  // Keyboard navigation for menu items
  const { selectedIndex, containerRef } = useKeyboardNavigation({
    isActive: isOpen,
    itemCount: allCommands.length,
    onSelect: (index) => allCommands[index].action(),
    onClose: () => setIsOpen(false),
    loop: true
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex bg-black/60 md:items-start md:justify-center md:pt-[15vh] md:p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(false)}
          role='dialog'
          aria-modal='true'
          aria-labelledby='command-menu-title'
          aria-describedby='command-menu-description'
        >
          <motion.div
            ref={focusTrapRef}
            className='relative h-auto overflow-hidden shadow-token-2xl md:h-auto md:max-h-token-command-menu md:rounded-xl bg-[color:var(--token-bg-frosted)]/125 dark:bg-[color:var(--token-bg-frosted)] backdrop-blur-lg border border-white/20'
            style={{
              width: 'var(--token-command-width-mobile)',
              maxWidth: 'var(--token-command-width-desktop)',
            }}
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <Command className='w-full' role='menu' aria-labelledby='command-menu-title'>
              {/* Mobile-only close button - positioned for thumb reach */}
              <div className='md:hidden flex justify-end p-2'>
                <button
                  className='mobile-touch-md rounded-lg p-2 transition-all duration-200 hover:bg-token-primary-50 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)]'
                  style={{
                    color: 'var(--token-command-text)',
                  }}
                  onClick={() => setIsOpen(false)}
                  aria-label='Close command menu'
                >
                  <X
                    style={{
                      width: 'var(--token-size-icon-responsive)',
                      height: 'var(--token-size-icon-responsive)',
                      color: 'var(--token-command-text)'
                    }}
                  />
                </button>
              </div>

              {/* Desktop close button - positioned in top right */}
              <div className='hidden md:flex justify-end p-2'>
                <button
                  className='mobile-touch-md rounded-lg p-2 transition-all duration-200 hover:bg-token-primary-50 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)]'
                  style={{
                    color: 'var(--token-command-text)',
                  }}
                  onClick={() => setIsOpen(false)}
                  aria-label='Close command menu'
                >
                  <X
                    style={{
                      width: 'var(--token-size-icon-responsive)',
                      height: 'var(--token-size-icon-responsive)',
                      color: 'var(--token-command-text)'
                    }}
                  />
                </button>
              </div>

              {/* Hidden accessibility labels */}
              <h2 id='command-menu-title' className='sr-only'>
                Command Menu
              </h2>
              <p id='command-menu-description' className='sr-only'>
                Choose an action to perform. Use arrow keys to navigate, Enter to select, or Escape to close.
              </p>

              {copied && (
                <div className='border-b border-token-primary-100 bg-token-primary-50 px-4 py-3'>
                  <div className='flex items-center text-token-primary-700'>
                    <Check
                      style={{
                        width: 'calc(var(--token-size-icon) * 0.75)',
                        height: 'calc(var(--token-size-icon) * 0.75)',
                        marginRight: '0.5rem'
                      }}
                    />
                    <p className='text-sm font-medium'>
                      Email copied to clipboard
                    </p>
                  </div>
                </div>
              )}

              {/* Command List with proper cmdk structure */}
              <Command.List
                ref={containerRef}
                className='command-menu-container overflow-hidden md:max-h-token-command-list md:overflow-y-auto'
                style={{
                  padding: 'var(--token-command-padding-responsive-y) var(--token-command-padding-responsive-x)',
                }}
              >
                {/* Navigate Group - moved to first position */}
                <div>
                  <h3
                    className="command-menu-text"
                    style={{
                      color: 'var(--token-command-label)',
                      marginBottom: 'var(--token-command-group-heading-margin)',
                      fontSize: 'var(--token-typography-size-responsive-md)',
                      fontWeight: 'var(--token-typography-weight-semibold)',
                    }}
                    aria-label='Navigation commands'
                  >
                    Navigate
                  </h3>
                  {/* Timeline Item */}
                  <Command.Item
                    key={commandGroups.navigate[0].id}
                    onSelect={() => commandGroups.navigate[0].action()}
                    className={`command-menu-item w-full mobile-touch-md flex cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] md:hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] ${selectedIndex === 0
                      ? 'bg-token-primary-100'
                      : 'hover:bg-token-primary-50'
                      }`}
                    style={{
                      color: 'var(--token-command-text)',
                      backgroundColor: selectedIndex === 0 ? 'var(--token-primary-100)' : 'transparent',
                      transitionDuration: 'var(--duration-hover)',
                      padding: 'var(--token-command-item-padding-responsive-y) var(--token-command-item-padding-responsive-x)',
                      marginBottom: 'var(--token-spacing-responsive-item-gap)',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedIndex !== 0) {
                        e.currentTarget.style.backgroundColor = 'var(--token-primary-50)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedIndex !== 0) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    role='button'
                    aria-label='Navigate to experience timeline section'
                    aria-describedby={`${commandGroups.navigate[0].id}-description`}
                    aria-selected={selectedIndex === 0}
                  >
                    <div
                      className='command-menu-item-content flex items-center'
                      style={{ gap: 'var(--token-spacing-responsive-item-gap)' }}
                    >
                      <div className='flex-shrink-0' aria-hidden='true'>
                        {commandGroups.navigate[0].icon}
                      </div>
                      <span
                        className="command-menu-text"
                        style={{
                          color: 'var(--token-command-text)',
                          fontSize: 'var(--token-typography-size-responsive-sm)',
                          fontWeight: 'var(--token-typography-weight-medium)',
                        }}
                      >
                        {commandGroups.navigate[0].name}
                      </span>
                      <span id={`${commandGroups.navigate[0].id}-description`} className='sr-only'>
                        {commandGroups.navigate[0].keywords}
                      </span>
                    </div>
                  </Command.Item>

                  {/* Skills Item */}
                  <Command.Item
                    key={commandGroups.navigate[1].id}
                    onSelect={() => commandGroups.navigate[1].action()}
                    className={`command-menu-item w-full mobile-touch-md flex cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] md:hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] ${selectedIndex === 1
                      ? 'bg-token-primary-100'
                      : 'hover:bg-token-primary-50'
                      }`}
                    style={{
                      color: 'var(--token-command-text)',
                      backgroundColor: selectedIndex === 1 ? 'var(--token-primary-100)' : 'transparent',
                      transitionDuration: 'var(--duration-hover)',
                      padding: 'var(--token-command-item-padding-responsive-y) var(--token-command-item-padding-responsive-x)',
                      marginBottom: 'var(--token-spacing-responsive-item-gap)',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedIndex !== 1) {
                        e.currentTarget.style.backgroundColor = 'var(--token-primary-50)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedIndex !== 1) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    role='button'
                    aria-label='Navigate to skills section'
                    aria-describedby={`${commandGroups.navigate[1].id}-description`}
                    aria-selected={selectedIndex === 1}
                  >
                    <div
                      className='command-menu-item-content flex items-center'
                      style={{ gap: 'var(--token-spacing-responsive-item-gap)' }}
                    >
                      <div className='flex-shrink-0' aria-hidden='true'>
                        {commandGroups.navigate[1].icon}
                      </div>
                      <span
                        className="command-menu-text"
                        style={{
                          color: 'var(--token-command-text)',
                          fontSize: 'var(--token-typography-size-responsive-sm)',
                          fontWeight: 'var(--token-typography-weight-medium)',
                        }}
                      >
                        {commandGroups.navigate[1].name}
                      </span>
                      <span id={`${commandGroups.navigate[1].id}-description`} className='sr-only'>
                        {commandGroups.navigate[1].keywords}
                      </span>
                    </div>
                  </Command.Item>
                </div>

                {/* Section Divider between Navigate and Resume */}
                <hr
                  className='border-0 my-4'
                  style={{
                    height: 'var(--token-command-divider-height)',
                    background: 'var(--token-command-divider-bg)',
                    marginTop: 'var(--token-spacing-responsive-group-gap)',
                    marginBottom: 'var(--token-spacing-responsive-group-gap)',
                  }}
                  aria-hidden='true'
                />

                {/* Resume Group - moved to second position */}
                <div>
                  <h3
                    className="command-menu-text"
                    style={{
                      color: 'var(--token-command-label)',
                      marginBottom: 'var(--token-command-group-heading-margin)',
                      fontSize: 'var(--token-typography-size-responsive-md)',
                      fontWeight: 'var(--token-typography-weight-semibold)',
                    }}
                    aria-label='Resume commands'
                  >
                    Resume
                  </h3>
                  {commandGroups.resume.map((command, groupIndex) => {
                    const globalIndex = commandGroups.navigate.length + groupIndex;
                    return (
                      <Command.Item
                        key={command.id}
                        onSelect={() => command.action()}
                        className={`command-menu-item w-full mobile-touch-md flex cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] md:hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)]`}
                        style={{
                          color: 'var(--token-command-text)',
                          backgroundColor: selectedIndex === globalIndex ? 'var(--token-primary-100)' : 'transparent',
                          transitionDuration: 'var(--duration-hover)',
                          padding: 'var(--token-command-item-padding-responsive-y) var(--token-command-item-padding-responsive-x)',
                          marginBottom: 'var(--token-spacing-responsive-item-gap)',
                        }}
                        onMouseEnter={(e) => {
                          if (selectedIndex !== globalIndex) {
                            e.currentTarget.style.backgroundColor = 'var(--token-primary-50)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedIndex !== globalIndex) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                        role='button'
                        aria-label='Download resume PDF file'
                        aria-describedby={`${command.id}-description`}
                        aria-selected={selectedIndex === globalIndex}
                      >
                        <div
                          className='command-menu-item-content flex items-center'
                          style={{ gap: 'var(--token-spacing-responsive-item-gap)' }}
                        >
                          <div className='flex-shrink-0' aria-hidden='true'>
                            {command.icon}
                          </div>
                          <span
                            className="command-menu-text"
                            style={{
                              color: 'var(--token-command-text)',
                              fontSize: 'var(--token-typography-size-responsive-sm)',
                              fontWeight: 'var(--token-typography-weight-medium)',
                            }}
                          >
                            {command.name}
                          </span>
                          <span id={`${command.id}-description`} className='sr-only'>
                            {command.keywords}
                          </span>
                        </div>
                      </Command.Item>
                    );
                  })}
                </div>

                {/* Section Divider between Resume and Contact & Profiles */}
                <hr
                  className='border-0 my-4'
                  style={{
                    height: 'var(--token-command-divider-height)',
                    background: 'var(--token-command-divider-bg)',
                    marginTop: 'var(--token-spacing-responsive-group-gap)',
                    marginBottom: 'var(--token-spacing-responsive-group-gap)',
                  }}
                  aria-hidden='true'
                />

                {/* Contact & Profiles Group */}
                <div>
                  <h3
                    className="command-menu-text"
                    style={{
                      color: 'var(--token-command-label)',
                      marginBottom: 'var(--token-command-group-heading-margin)',
                      fontSize: 'var(--token-typography-size-responsive-md)',
                      fontWeight: 'var(--token-typography-weight-semibold)',
                    }}
                    aria-label='Contact and profile commands'
                  >
                    Contact & Profiles
                  </h3>
                  {/* Email Item */}
                  <CopyToClipboard
                    text='nathan.dryer@example.com'
                    onCopy={handleCopyEmail}
                  >
                    <Command.Item
                      key={commandGroups.contact[0].id}
                      onSelect={() => commandGroups.contact[0].action()}
                      className={`command-menu-item w-full mobile-touch-md flex cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] md:hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] ${selectedIndex === commandGroups.navigate.length + commandGroups.resume.length
                        ? 'bg-token-primary-100'
                        : 'hover:bg-token-primary-50'
                        }`}
                      style={{
                        color: 'var(--token-command-text)',
                        backgroundColor: selectedIndex === commandGroups.navigate.length + commandGroups.resume.length ? 'var(--token-primary-100)' : 'transparent',
                        transitionDuration: 'var(--duration-hover)',
                        padding: 'var(--token-command-item-padding-responsive-y) var(--token-command-item-padding-responsive-x)',
                        marginBottom: 'var(--token-spacing-responsive-item-gap)',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedIndex !== commandGroups.navigate.length + commandGroups.resume.length) {
                          e.currentTarget.style.backgroundColor = 'var(--token-primary-50)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedIndex !== commandGroups.navigate.length + commandGroups.resume.length) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                      role='button'
                      aria-describedby={`${commandGroups.contact[0].id}-description`}
                      aria-selected={selectedIndex === commandGroups.navigate.length + commandGroups.resume.length}
                    >
                      <div
                        className='command-menu-item-content flex items-center'
                        style={{ gap: 'var(--token-spacing-responsive-item-gap)' }}
                      >
                        <div className='flex-shrink-0' aria-hidden='true'>
                          {commandGroups.contact[0].icon}
                        </div>
                        <span
                          className="command-menu-text"
                          style={{
                            color: 'var(--token-command-text)',
                            fontSize: 'var(--token-typography-size-responsive-sm)',
                            fontWeight: 'var(--token-typography-weight-medium)',
                          }}
                        >
                          {commandGroups.contact[0].name}
                        </span>
                        <span id={`${commandGroups.contact[0].id}-description`} className='sr-only'>
                          {commandGroups.contact[0].keywords}
                        </span>
                      </div>
                    </Command.Item>
                  </CopyToClipboard>

                  {/* LinkedIn Item */}
                  <Command.Item
                    key={commandGroups.contact[1].id}
                    onSelect={() => commandGroups.contact[1].action()}
                    className={`command-menu-item w-full mobile-touch-md flex cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] md:hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] ${selectedIndex === commandGroups.navigate.length + commandGroups.resume.length + 1
                      ? 'bg-token-primary-100'
                      : 'hover:bg-token-primary-50'
                      }`}
                    style={{
                      color: 'var(--token-command-text)',
                      backgroundColor: selectedIndex === commandGroups.navigate.length + commandGroups.resume.length + 1 ? 'var(--token-primary-100)' : 'transparent',
                      transitionDuration: 'var(--duration-hover)',
                      padding: 'var(--token-command-item-padding-responsive-y) var(--token-command-item-padding-responsive-x)',
                      marginBottom: 'var(--token-spacing-responsive-item-gap)',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedIndex !== commandGroups.navigate.length + commandGroups.resume.length + 1) {
                        e.currentTarget.style.backgroundColor = 'var(--token-primary-50)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedIndex !== commandGroups.navigate.length + commandGroups.resume.length + 1) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    role='button'
                    aria-describedby={`${commandGroups.contact[1].id}-description`}
                    aria-selected={selectedIndex === commandGroups.navigate.length + commandGroups.resume.length + 1}
                  >
                    <div
                      className='command-menu-item-content flex items-center'
                      style={{ gap: 'var(--token-spacing-responsive-item-gap)' }}
                    >
                      <div className='flex-shrink-0' aria-hidden='true'>
                        {commandGroups.contact[1].icon}
                      </div>
                      <span
                        className="command-menu-text"
                        style={{
                          color: 'var(--token-command-text)',
                          fontSize: 'var(--token-typography-size-responsive-sm)',
                          fontWeight: 'var(--token-typography-weight-medium)',
                        }}
                      >
                        {commandGroups.contact[1].name}
                      </span>
                      <span id={`${commandGroups.contact[1].id}-description`} className='sr-only'>
                        {commandGroups.contact[1].keywords}
                      </span>
                    </div>
                  </Command.Item>

                  {/* GitHub Item */}
                  <Command.Item
                    key={commandGroups.contact[2].id}
                    onSelect={() => commandGroups.contact[2].action()}
                    className={`command-menu-item w-full mobile-touch-md flex cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] md:hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] ${selectedIndex === commandGroups.navigate.length + commandGroups.resume.length + 2
                      ? 'bg-token-primary-100'
                      : 'hover:bg-token-primary-50'
                      }`}
                    style={{
                      color: 'var(--token-command-text)',
                      backgroundColor: selectedIndex === commandGroups.navigate.length + commandGroups.resume.length + 2 ? 'var(--token-primary-100)' : 'transparent',
                      transitionDuration: 'var(--duration-hover)',
                      padding: 'var(--token-command-item-padding-responsive-y) var(--token-command-item-padding-responsive-x)',
                      marginBottom: 'var(--token-spacing-responsive-item-gap)',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedIndex !== commandGroups.navigate.length + commandGroups.resume.length + 2) {
                        e.currentTarget.style.backgroundColor = 'var(--token-primary-50)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedIndex !== commandGroups.navigate.length + commandGroups.resume.length + 2) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    role='button'
                    aria-describedby={`${commandGroups.contact[2].id}-description`}
                    aria-selected={selectedIndex === commandGroups.navigate.length + commandGroups.resume.length + 2}
                  >
                    <div
                      className='command-menu-item-content flex items-center'
                      style={{ gap: 'var(--token-spacing-responsive-item-gap)' }}
                    >
                      <div className='flex-shrink-0' aria-hidden='true'>
                        {commandGroups.contact[2].icon}
                      </div>
                      <span
                        className="command-menu-text"
                        style={{
                          color: 'var(--token-command-text)',
                          fontSize: 'var(--token-typography-size-responsive-sm)',
                          fontWeight: 'var(--token-typography-weight-medium)',
                        }}
                      >
                        {commandGroups.contact[2].name}
                      </span>
                      <span id={`${commandGroups.contact[2].id}-description`} className='sr-only'>
                        {commandGroups.contact[2].keywords}
                      </span>
                    </div>
                  </Command.Item>
                </div>

              </Command.List>

            </Command>
          </motion.div>
        </motion.div>
      )
      }
    </AnimatePresence >
  );
};
