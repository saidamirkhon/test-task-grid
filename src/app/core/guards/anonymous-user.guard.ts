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
export class AnonymousUserGuard implements CanActivate, CanActivateChild, CanLoad {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAnonymousUser();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAnonymousUser();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.isAnonymousUser();
  }

  private isAnonymousUser(): boolean {
    if (this.userService.isAuthenticated()) {
      this.router.navigate([AppPaths.TERM]);
      return false;
    }
    return true;
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

}
