import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./apps/role-selection/role-selection').then((m) => m.RoleSelectionComponent),
  },
  {
    path: 'access-denied',
    loadComponent: () =>
      import('./apps/access-denied/access-denied').then((m) => m.AccessDeniedComponent),
  },
  {
    path: 'data',
    loadComponent: () => import('./apps/data/data').then((m) => m.DataComponent),
    canActivate: [roleGuard],
  },
];
