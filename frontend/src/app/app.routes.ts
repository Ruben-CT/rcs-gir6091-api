import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./features/tasks/task-list/task-list.component').then(
            (m) => m.TaskListComponent,
          ),
      },
      {
        path: 'tasks/new',
        loadComponent: () =>
          import('./features/tasks/task-form/task-form.component').then(
            (m) => m.TaskFormComponent,
          ),
      },
      {
        path: 'tasks/:id/edit',
        loadComponent: () =>
          import('./features/tasks/task-form/task-form.component').then(
            (m) => m.TaskFormComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'tasks' },
];
