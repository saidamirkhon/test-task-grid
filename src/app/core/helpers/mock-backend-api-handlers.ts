import {
  HttpEvent,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {
  Observable,
  of,
  throwError
} from 'rxjs';
import { ITerm } from '../../term/models/term';
import { TermsCreator } from './terms-creator';
import { HttpMethods } from '../enums/http-methods';
import { delay } from 'rxjs/operators';

const login: IMockBackendApiHandlerFunction = (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
  const {login, password} = request.body;
  if (login === 'admin' && password === 'admin') {
    return okWithDelay<{token: string}>({token: 'token'}, request.method as HttpMethods);
  }
  return notFoundWithDelay(request.method as HttpMethods);
};

const getTerms: IMockBackendApiHandlerFunction = (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
  const termsInStorage: ITerm[] = getTermsFromStorage();
  if (termsInStorage) {
    return okWithDelay<ITerm[]>(termsInStorage, request.method as HttpMethods);
  }
  saveTermsToStorage(TermsCreator.getTerms() as ITerm[]);
  return okWithDelay<ITerm[]>(TermsCreator.getTerms(), request.method as HttpMethods);
};

const updateTerm: IMockBackendApiHandlerFunction = (request: HttpRequest<any>): Observable<HttpEvent<ITerm>> => {
  const termsInStorage: ITerm[] = getTermsFromStorage();
  const {url, body} = request;
  const termId = parseInt(url.split('/')
    .pop());
  if (isNaN(termId)) {
    return notFoundWithDelay(request.method as HttpMethods);
  }
  const existingTermIndex: number = termsInStorage.findIndex((term: ITerm) => term.id === termId);
  if (existingTermIndex === -1) {
    return notFoundWithDelay(request.method as HttpMethods);
  }
  termsInStorage.splice(existingTermIndex, 1, body);
  saveTermsToStorage(termsInStorage);
  return okWithDelay<ITerm>(body, request.method as HttpMethods);
};

export const mockBackendApiHandlers: IMockBackendApiHandler[] = [
  // order of handlers matters
  // please place more specific routes at the top
  {
    pattern: /^\/user\/login$/,
    handlers: {
      [HttpMethods.POST]: login,
    }
  },
  {
    pattern: /^\/term$/,
    handlers: {
      [HttpMethods.GET]: getTerms,
    }
  },
  {
    pattern: /^\/term\/\d+$/,
    handlers: {
      [HttpMethods.PUT]: updateTerm
    }
  }
];

export interface IMockBackendApiHandler {
  pattern: RegExp;
  handlers: Partial<Record<HttpMethods, IMockBackendApiHandlerFunction>>
}

export interface IMockBackendApiHandlerFunction {
  (request: HttpRequest<any>): Observable<HttpEvent<any>>;
}

function getTermsFromStorage(): ITerm[] {
  return JSON.parse(localStorage.getItem('terms'));
}

function saveTermsToStorage(terms: ITerm[]): void {
  localStorage.setItem('terms', JSON.stringify(terms));
}

function notFound(): Observable<never> {
  return throwError({status: 404, error: {message: 'Not found!'}});
}

function notFoundWithDelay(requestMethod: HttpMethods): Observable<never> {
  return notFound()
    .pipe(
      delay(getResponseDelayMs(requestMethod))
    );
}

function ok<T>(data: T): Observable<HttpResponse<T>> {
  return of(new HttpResponse({status: 200, body: data}));
}

function okWithDelay<T>(data: T, requestMethod: HttpMethods): Observable<HttpResponse<T>> {
  return ok<T>(data)
    .pipe(
      delay(getResponseDelayMs(requestMethod))
    );
}

function getResponseDelayMs(requestMethod: HttpMethods): number {
  const responseDelayMap = {} as Record<HttpMethods, number>;
  responseDelayMap[HttpMethods.GET] = 100;
  responseDelayMap[HttpMethods.POST] = 100;
  responseDelayMap[HttpMethods.DELETE] = 100;
  responseDelayMap[HttpMethods.PUT] = 40;
  return responseDelayMap[requestMethod];
}

