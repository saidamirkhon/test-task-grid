import { Route } from '@angular/router';
import { UserPaths } from './user.paths';
import { UserContainerComponent } from './containers/user-container/user-container.component';
import { LogInContainerComponent } from './containers/log-in-container/log-in-container.component';
import { AnonymousUserGuard } from '../core/guards/anonymous-user.guard';

export const userRoutes: Route[] = [
  {
    path: '',
    component: UserContainerComponent,
    canActivate: [AnonymousUserGuard],
    canActivateChild: [AnonymousUserGuard],
    children: [
      {
        path: '',
        redirectTo: UserPaths.LOGIN,
        pathMatch: 'full'
      },
      {
        path: UserPaths.LOGIN,
        component: LogInContainerComponent
      },
      {
        path: '**',
        redirectTo: UserPaths.LOGIN
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
