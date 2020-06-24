import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  throwError,
} from 'rxjs';
import {
  IMockBackendApiHandler,
  IMockBackendApiHandlerFunction,
  mockBackendApiHandlers
} from '../helpers/mock-backend-api-handlers';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {method, url} = req;
    const handler: IMockBackendApiHandlerFunction = mockBackendApiHandlers.reduce((
      handlerFunction: IMockBackendApiHandlerFunction,
      handler: IMockBackendApiHandler
    ) => {
      if (url.match(handler.pattern)) {
        const foundHandlerFunction = handler.handlers[method];
        if (foundHandlerFunction) {
          handlerFunction = foundHandlerFunction;
        }
      }
      return handlerFunction;
    }, null);
    if (handler) {
      return handler(req);
    }
    return throwError({status: 404, error: {message: 'Not found!'}});
  }
}
