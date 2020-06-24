import { Injectable } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable()
export class TokenService {
  private readonly tokenKey = 'token';

  saveToken(token: string): void {
    if (this.platformService.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string {
    if (this.platformService.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
  }

  removeToken(): void {
    if (this.platformService.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  constructor(private platformService: PlatformService) {
  }
}
