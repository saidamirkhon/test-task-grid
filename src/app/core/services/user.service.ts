import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { AppPaths } from '../../app.paths';
import { IUserAuthInfo } from '../../user/models/user-auth-info';
import { IUserAuthResponse } from '../../user/models/user-auth-response';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {
  logIn(userAuthInfo: IUserAuthInfo): Observable<IUserAuthResponse> {
    return this.http
      .post<IUserAuthResponse>(
        '/user/login',
        userAuthInfo
      )
      .pipe(
        tap((userAuthResponse: IUserAuthResponse) => this.tokenService.saveToken(userAuthResponse.token))
      );
  }

  logOut(): void {
    this.tokenService.removeToken();
    this.router.navigate([AppPaths.USER]);
  }

  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
  }
}
