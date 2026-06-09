import { Injectable, signal } from '@angular/core';

import { ATOM_DARK_MODE_CLASS_DEFAULT } from '@atomchat-io/ui-design-system';

const STORAGE_KEY = 'atom-table-playground-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal(this.readInitialTheme());

  constructor() {
    this.apply(this.isDark());
  }

  toggle(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    this.apply(next);
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
  }

  private readInitialTheme(): boolean {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') {
      return true;
    }
    if (stored === 'light') {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private apply(isDark: boolean): void {
    document.body.classList.toggle(ATOM_DARK_MODE_CLASS_DEFAULT, isDark);
  }
}
