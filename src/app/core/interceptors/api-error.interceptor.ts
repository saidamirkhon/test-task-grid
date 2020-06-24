import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {
  EMPTY,
  Observable
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UiNotificationService } from '../services/ui-notification.service';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.uiNotificationService.show(response.error.message);
          return EMPTY;
        })
      );
  }

  constructor(private uiNotificationService: UiNotificationService) {
  }

}
