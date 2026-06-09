import { Injectable, signal } from '@angular/core';

import { ATOM_DARK_MODE_CLASS_DEFAULT } from '@atomchat-io/ui-design-system';

import { DEMO_APP } from '../shared/demo-config';

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
    localStorage.setItem(DEMO_APP.themeStorageKey, next ? 'dark' : 'light');
  }

  private readInitialTheme(): boolean {
    const stored = localStorage.getItem(DEMO_APP.themeStorageKey);
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
