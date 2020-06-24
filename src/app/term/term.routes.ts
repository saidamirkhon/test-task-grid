import { Route } from '@angular/router';
import { TermContainerComponent } from './containers/term-container/term-container.component';
import { AuthenticatedUserGuard } from '../core/guards/authenticated-user.guard';

export const termRoutes: Route[] = [
  {
    path: '',
    canActivate: [AuthenticatedUserGuard],
    component: TermContainerComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
