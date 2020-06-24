import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITerm } from '../models/term';

@Injectable()
export class TermApiService {
  fetch(): Observable<ITerm[]> {
    return this.http.get<ITerm[]>('/term');
  }

  update(id: number, term: ITerm): Observable<ITerm> {
    return this.http.put<ITerm>(`/term/${id}`, term);
  }

  constructor(private http: HttpClient) {
  }
}
