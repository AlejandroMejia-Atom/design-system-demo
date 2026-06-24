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
        title: 'Atom Form Inputs Playground',
      },
      {
        path: 'examples/form-inputs/text-field',
        loadComponent: () =>
          import('./examples/form-inputs/text-field/text-field-example.component').then(
            (m) => m.TextFieldExampleComponent,
          ),
        title: 'Text Field',
      },
      {
        path: 'examples/form-inputs/search-input',
        loadComponent: () =>
          import('./examples/form-inputs/search-input/search-input-example.component').then(
            (m) => m.SearchInputExampleComponent,
          ),
        title: 'Search Input',
      },
      {
        path: 'examples/form-inputs/text-area',
        loadComponent: () =>
          import('./examples/form-inputs/text-area/text-area-example.component').then(
            (m) => m.TextAreaExampleComponent,
          ),
        title: 'Text Area',
      },
      {
        path: 'examples/form-inputs/select-input',
        loadComponent: () =>
          import('./examples/form-inputs/select-input/select-input-example.component').then(
            (m) => m.SelectInputExampleComponent,
          ),
        title: 'Select Input',
      },
      {
        path: 'examples/form-inputs/date-picker',
        loadComponent: () =>
          import('./examples/form-inputs/date-picker/date-picker-example.component').then(
            (m) => m.DatePickerExampleComponent,
          ),
        title: 'Date Picker',
      },
      {
        path: 'examples/form-inputs/time-picker',
        loadComponent: () =>
          import('./examples/form-inputs/time-picker/time-picker-example.component').then(
            (m) => m.TimePickerExampleComponent,
          ),
        title: 'Time Picker',
      },
      {
        path: 'examples/form-inputs/form-field',
        loadComponent: () =>
          import('./examples/form-inputs/form-field/form-field-example.component').then(
            (m) => m.FormFieldExampleComponent,
          ),
        title: 'Form Field',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
