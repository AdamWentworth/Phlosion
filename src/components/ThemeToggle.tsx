'use client';

import { Moon, Sun } from 'lucide-react';

const THEME_STORAGE_KEY = 'phlosion-theme';

export function ThemeToggle() {
  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The selected theme still applies for this visit when storage is unavailable.
    }
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Switch color theme">
      <Sun className="theme-toggle-icon theme-toggle-icon-sun" size={16} aria-hidden="true" />
      <Moon className="theme-toggle-icon theme-toggle-icon-moon" size={16} aria-hidden="true" />
      <span className="theme-toggle-label theme-toggle-label-light">Light mode</span>
      <span className="theme-toggle-label theme-toggle-label-dark">Dark mode</span>
    </button>
  );
}
