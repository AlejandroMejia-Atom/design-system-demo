import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AppShellComponent } from './shell/app-shell.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Atom Filter Playground',
      },
      {
        path: 'examples/filters/filter-trigger',
        loadComponent: () =>
          import('./examples/filters/filter-trigger/filter-trigger-example.component').then(
            (m) => m.FilterTriggerExampleComponent,
          ),
        title: 'Filter Trigger',
      },
      {
        path: 'examples/filters/filter-chip',
        loadComponent: () =>
          import('./examples/filters/filter-chip/filter-chip-example.component').then(
            (m) => m.FilterChipExampleComponent,
          ),
        title: 'Filter Chip',
      },
      {
        path: 'examples/filters/filter-row',
        loadComponent: () =>
          import('./examples/filters/filter-row/filter-row-example.component').then(
            (m) => m.FilterRowExampleComponent,
          ),
        title: 'Filter Row',
      },
      {
        path: 'examples/filters/filter-panel',
        loadComponent: () =>
          import('./examples/filters/filter-panel/filter-panel-example.component').then(
            (m) => m.FilterPanelExampleComponent,
          ),
        title: 'Filter Panel',
      },
      {
        path: 'examples/filters/filter-category',
        loadComponent: () =>
          import('./examples/filters/filter-category/filter-category-example.component').then(
            (m) => m.FilterCategoryExampleComponent,
          ),
        title: 'Filter Category',
      },
      {
        path: 'examples/filters/filter-organism',
        loadComponent: () =>
          import('./examples/filters/filter-organism/filter-organism-example.component').then(
            (m) => m.FilterOrganismExampleComponent,
          ),
        title: 'atom-filter',
      },
      {
        path: 'examples/filters/filter-initial-values',
        loadComponent: () =>
          import('./examples/filters/filter-initial-values/filter-initial-values-example.component').then(
            (m) => m.FilterInitialValuesExampleComponent,
          ),
        title: 'Filter Initial Values',
      },
      {
        path: 'examples/filters/filter-selection-changes',
        loadComponent: () =>
          import('./examples/filters/filter-selection-changes/filter-selection-changes-example.component').then(
            (m) => m.FilterSelectionChangesExampleComponent,
          ),
        title: 'Filter Selection Changes',
      },
      {
        path: 'examples/filters/filter-i18n',
        loadComponent: () =>
          import('./examples/filters/filter-i18n/filter-i18n-example.component').then(
            (m) => m.FilterI18nExampleComponent,
          ),
        title: 'Filter i18n',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
