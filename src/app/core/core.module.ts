import { NgModule } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import { AnonymousUserGuard } from './guards/anonymous-user.guard';
import { AuthenticatedUserGuard } from './guards/authenticated-user.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PlatformService } from './services/platform.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { UiNotificationService } from './services/ui-notification.service';
import { ApiErrorInterceptor } from './interceptors/api-error.interceptor';
import { MockBackendInterceptor } from './interceptors/mock-backend.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    PlatformService,
    TokenService,
    UserService,
    UiNotificationService,
    AnonymousUserGuard,
    AuthenticatedUserGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockBackendInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {
}
