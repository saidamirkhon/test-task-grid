import { Route } from '@angular/router';
import { AppPaths } from './app.paths';
import { AnonymousUserGuard } from './core/guards/anonymous-user.guard';
import { AuthenticatedUserGuard } from './core/guards/authenticated-user.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: AppPaths.USER,
    pathMatch: 'full'
  },
  {
    path: AppPaths.USER,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canLoad: [AnonymousUserGuard]
  },
  {
    path: AppPaths.TERM,
    loadChildren: () => import('./term/term.module').then(m => m.TermModule),
    canLoad: [AuthenticatedUserGuard],
  },
  {
    path: '**',
    redirectTo: AppPaths.USER
  }
];
