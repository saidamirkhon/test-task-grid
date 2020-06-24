import {
  Inject,
  Injectable,
  PLATFORM_ID
} from '@angular/core';
import {
  isPlatformBrowser,
  isPlatformServer
} from '@angular/common';

@Injectable()
export class PlatformService {
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
  }
}
