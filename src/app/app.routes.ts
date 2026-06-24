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
      {
        path: 'examples/form-inputs/text-field-form-control',
        loadComponent: () =>
          import('./examples/form-inputs/text-field-form-control/text-field-form-control-example.component').then(
            (m) => m.TextFieldFormControlExampleComponent,
          ),
        title: 'Text Field + FormControl',
      },
      {
        path: 'examples/form-inputs/search-input-form-control',
        loadComponent: () =>
          import('./examples/form-inputs/search-input-form-control/search-input-form-control-example.component').then(
            (m) => m.SearchInputFormControlExampleComponent,
          ),
        title: 'Search Input + FormControl',
      },
      {
        path: 'examples/form-inputs/text-area-form-control',
        loadComponent: () =>
          import('./examples/form-inputs/text-area-form-control/text-area-form-control-example.component').then(
            (m) => m.TextAreaFormControlExampleComponent,
          ),
        title: 'Text Area + FormControl',
      },
      {
        path: 'examples/form-inputs/select-input-form-control',
        loadComponent: () =>
          import('./examples/form-inputs/select-input-form-control/select-input-form-control-example.component').then(
            (m) => m.SelectInputFormControlExampleComponent,
          ),
        title: 'Select Input + FormControl',
      },
      {
        path: 'examples/form-inputs/date-picker-form-control',
        loadComponent: () =>
          import('./examples/form-inputs/date-picker-form-control/date-picker-form-control-example.component').then(
            (m) => m.DatePickerFormControlExampleComponent,
          ),
        title: 'Date Picker + FormControl',
      },
      {
        path: 'examples/form-inputs/time-picker-form-control',
        loadComponent: () =>
          import('./examples/form-inputs/time-picker-form-control/time-picker-form-control-example.component').then(
            (m) => m.TimePickerFormControlExampleComponent,
          ),
        title: 'Time Picker + FormControl',
      },
      {
        path: 'examples/form-inputs/form-group',
        loadComponent: () =>
          import('./examples/form-inputs/form-group/form-group-example.component').then(
            (m) => m.FormGroupExampleComponent,
          ),
        title: 'FormGroup',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
