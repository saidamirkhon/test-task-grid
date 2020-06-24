import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { AppPaths } from '../../app.paths';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticatedUserGuard implements CanLoad, CanActivate, CanActivateChild {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAuthenticatedUser();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAuthenticatedUser();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.isAuthenticatedUser();
  }

  private isAuthenticatedUser(): boolean {
    if (this.userService.isAuthenticated()) {
      return true;
    }
    this.router.navigate([AppPaths.USER]);
    return false;
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }
}
