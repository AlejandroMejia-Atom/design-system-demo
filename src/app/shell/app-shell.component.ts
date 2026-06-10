import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { TABLE_BUILDER_EXAMPLE_GROUPS } from '../examples/table-builder/shared/table-builder-examples.catalog';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  protected readonly groups = TABLE_BUILDER_EXAMPLE_GROUPS;
  protected readonly theme = inject(ThemeService);
  protected readonly sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  toggleTheme(): void {
    this.theme.toggle();
  }
}
