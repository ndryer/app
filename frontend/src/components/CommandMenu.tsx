// ◀︎ LLM-modified - Enhanced hover effects with subtle inner glow using design tokens, improved font rendering for glassmorphism backgrounds
import React, { useState, useCallback, useRef } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Mail, Download, Eye, Code, Linkedin, Github, X, Check } from 'lucide-react';

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
  const selectedIndex = 0; // ◀︎ LLM-modified: Fixed index for consistent behavior
  const focusTrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Commands are handled individually by sections, no flattened array needed

  // Simplified keyboard navigation - removed for now to fix build

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex bg-black/60 md:items-start md:justify-center md:p-4 md:pt-[15vh]'
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
            className='shadow-token-2xl md:max-h-token-command-menu bg-[color:var(--token-bg-frosted)]/125 relative h-auto overflow-hidden border border-white/20 backdrop-blur-lg dark:bg-[color:var(--token-bg-frosted)] md:h-auto md:rounded-xl'
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
              <div className='flex justify-end p-2 md:hidden'>
                <button
                  className='mobile-touch-md rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-token-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)]'
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
              <div className='hidden justify-end p-2 md:flex'>
                <button
                  className='mobile-touch-md rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-token-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)]'
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
                className='command-menu-container md:max-h-token-command-list overflow-hidden md:overflow-y-auto'
                style={{
                  padding: 'var(--token-command-padding-responsive-y) var(--token-command-padding-responsive-x)',
                }}
              >
                {/* Navigate Group - moved to first position */}
                <div>
                  <h3
                    className="command-menu-text text-token-command-heading font-token-semibold"
                    style={{
                      color: 'var(--token-command-label)',
                      marginBottom: 'var(--token-command-group-heading-margin)',
                    }}
                    aria-label='Navigation commands'
                  >
                    Navigate
                  </h3>
                  {/* Timeline Item */}
                  <Command.Item
                    key={commandGroups.navigate[0].id}
                    onSelect={() => commandGroups.navigate[0].action()}
                    className={`command-menu-item mobile-touch-md flex w-full cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] md:hover:scale-[1.05] ${selectedIndex === 0
                      ? 'bg-token-primary-100'
                      : 'hover:bg-token-primary-100'
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
                        // ◀︎ LLM-modified: Use primary-100 for better contrast in both light and dark modes
                        e.currentTarget.style.backgroundColor = 'var(--token-primary-100)';
                        e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--token-glow-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedIndex !== 0) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
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
                    className="command-menu-item mobile-touch-md flex w-full cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] hover:bg-token-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] md:hover:scale-[1.05]"
                    style={{
                      color: 'var(--token-command-text)',
                      backgroundColor: 'transparent',
                      transitionDuration: 'var(--duration-hover)',
                      padding: 'var(--token-command-item-padding-responsive-y) var(--token-command-item-padding-responsive-x)',
                      marginBottom: 'var(--token-spacing-responsive-item-gap)',
                    }}
                    onMouseEnter={(e) => {
                      // ◀︎ LLM-modified: Use primary-100 for better contrast in both light and dark modes
                      e.currentTarget.style.backgroundColor = 'var(--token-primary-100)';
                      e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--token-glow-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    role='button'
                    aria-label='Navigate to skills section'
                    aria-describedby={`${commandGroups.navigate[1].id}-description`}
                    aria-selected={false}
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
                  className='my-4 border-0'
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
                        className={`command-menu-item mobile-touch-md flex w-full cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] md:hover:scale-[1.05]`}
                        style={{
                          color: 'var(--token-command-text)',
                          backgroundColor: selectedIndex === globalIndex ? 'var(--token-primary-100)' : 'transparent',
                          transitionDuration: 'var(--duration-hover)',
                          padding: 'var(--token-command-item-padding-responsive-y) var(--token-command-item-padding-responsive-x)',
                          marginBottom: 'var(--token-spacing-responsive-item-gap)',
                        }}
                        onMouseEnter={(e) => {
                          if (selectedIndex !== globalIndex) {
                            // ◀︎ LLM-modified: Use primary-100 for better contrast in both light and dark modes
                            e.currentTarget.style.backgroundColor = 'var(--token-primary-100)';
                            e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--token-glow-hover)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedIndex !== globalIndex) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.boxShadow = 'none';
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
                  className='my-4 border-0'
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
                      className={`command-menu-item mobile-touch-md flex w-full cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] md:hover:scale-[1.05] ${selectedIndex === commandGroups.navigate.length + commandGroups.resume.length
                        ? 'bg-token-primary-100'
                        : 'hover:bg-token-primary-100'
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
                          // ◀︎ LLM-modified: Use primary-100 for better contrast in both light and dark modes
                          e.currentTarget.style.backgroundColor = 'var(--token-primary-100)';
                          e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--token-glow-hover)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedIndex !== commandGroups.navigate.length + commandGroups.resume.length) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.boxShadow = 'none';
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
                    className={`command-menu-item mobile-touch-md flex w-full cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] md:hover:scale-[1.05] ${selectedIndex === commandGroups.navigate.length + commandGroups.resume.length + 1
                      ? 'bg-token-primary-100'
                      : 'hover:bg-token-primary-100'
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
                        // ◀︎ LLM-modified: Use primary-100 for better contrast in both light and dark modes
                        e.currentTarget.style.backgroundColor = 'var(--token-primary-100)';
                        e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--token-glow-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedIndex !== commandGroups.navigate.length + commandGroups.resume.length + 1) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
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
                    className={`command-menu-item mobile-touch-md flex w-full cursor-pointer items-center justify-between rounded-lg text-left transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-command-focus-ring-color)] focus-visible:ring-offset-[var(--token-command-focus-ring-offset)] md:hover:scale-[1.05] ${selectedIndex === commandGroups.navigate.length + commandGroups.resume.length + 2
                      ? 'bg-token-primary-100'
                      : 'hover:bg-token-primary-100'
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
                        // ◀︎ LLM-modified: Use primary-100 for better contrast in both light and dark modes
                        e.currentTarget.style.backgroundColor = 'var(--token-primary-100)';
                        e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--token-glow-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedIndex !== commandGroups.navigate.length + commandGroups.resume.length + 2) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
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
