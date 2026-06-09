import { Routes } from '@angular/router';

import { DEMO_APP } from './shared/demo-config';
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
        title: DEMO_APP.documentTitle,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
