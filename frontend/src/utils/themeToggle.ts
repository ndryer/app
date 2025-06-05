// ◀︎ LLM-modified
// Theme toggle utility functions - exactly 12 lines as requested
// Manages .dark class on <html> element and localStorage persistence

export const toggleTheme = (): boolean => {
  const htmlElement = document.documentElement;
  const isDark = htmlElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  return isDark;
};

export const setTheme = (isDark: boolean): void => {
  const htmlElement = document.documentElement;
  if (isDark) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

export const getStoredTheme = (): boolean => {
  const stored = localStorage.getItem('theme');
  return stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
};
