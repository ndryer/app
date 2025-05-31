import React, { useState, useEffect, useRef } from 'react';
import { Command } from 'cmdk';
import { Download, Mail, Linkedin, Github, Moon, Sun, ChevronRight } from 'lucide-react';

const CommandMenu = ({ userData, toggleTheme, darkMode }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Define command items
  const items = [
    { 
      label: "Download résumé", 
      icon: Download, 
      href: "/nathan_dryer_resume.pdf", 
      shortcut: "⏎", 
      primary: true 
    },
    { 
      label: "Email Nate", 
      icon: Mail, 
      href: `mailto:${userData.email}` 
    },
    { 
      label: "LinkedIn", 
      icon: Linkedin, 
      href: userData.socialLinks.find(link => link.name === "LinkedIn")?.url || "#" 
    },
    { 
      label: "GitHub", 
      icon: Github, 
      href: userData.socialLinks.find(link => link.name === "GitHub")?.url || "#" 
    },
    { 
      label: `Toggle ${darkMode ? 'light' : 'dark'} mode`, 
      icon: darkMode ? Sun : Moon, 
      action: "theme" 
    },
  ];

  // Filter items based on search input
  const filteredItems = inputValue === '' 
    ? items 
    : items.filter(item => 
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      );

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Open command palette with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus input on palette open only on desktop
  useEffect(() => {
    if (open && window.innerWidth >= 768) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Handle email copy
  const handleEmailCopy = () => {
    navigator.clipboard.writeText(userData.email);
    // You could add a toast notification here
    setOpen(false);
  };

  return (
    <Command
      label="Site command palette"
      className="w-full max-w-full md:max-w-md mx-auto rounded-2xl bg-white/65 dark:bg-slate-900/50
                backdrop-blur-sm shadow-lg ring-1 ring-black/5 dark:ring-white/10
                focus-within:ring-blue-500 dark:focus-within:ring-blue-400 transition"
    >
      <Command.Input
        ref={inputRef}
        value={inputValue}
        onValueChange={setInputValue}
        placeholder="Type a command…"
        className="h-12 w-full bg-transparent px-4 text-base text-gray-800 dark:text-white outline-none"
        autoComplete="off"
      />
      <Command.List 
        ref={listRef}
        className="grid gap-1 p-2"
      >
        {filteredItems.map(({ label, icon: Icon, href, shortcut, primary, action }) => (
          <Command.Item 
            key={label} 
            className="rounded-xl focus:bg-slate-100 dark:focus:bg-white/5 outline-none"
            role="menuitem"
          >
            {href ? (
              <a
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full min-h-[48px]
                          ${primary 
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" 
                            : "hover:bg-slate-100 dark:hover:bg-white/5"}`}
                download={href.includes('resume') ? "Nathan_Dryer_Resume.pdf" : undefined}
              >
                <div className={`flex items-center justify-center w-8 h-8 ${primary 
                  ? "bg-white/20 rounded-full" 
                  : "text-blue-500 dark:text-blue-400"}`}>
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                <span className="grow text-left">{label}</span>
                {shortcut && (
                  <kbd className="px-2 py-1 text-xs bg-black/5 dark:bg-white/10 rounded">
                    {shortcut}
                  </kbd>
                )}
                {!primary && !shortcut && <ChevronRight className="w-4 h-4 opacity-50" />}
              </a>
            ) : (
              <button
                onClick={() => {
                  if (action === "theme") {
                    toggleTheme();
                  }
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl w-full min-h-[48px]
                          hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <div className="flex items-center justify-center w-8 h-8 text-blue-500 dark:text-blue-400">
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                <span className="grow text-left text-gray-800 dark:text-white">{label}</span>
              </button>
            )}
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  );
};

export default CommandMenu;
