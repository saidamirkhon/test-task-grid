import { Injectable } from '@angular/core';
import { TermApiService } from './term-api.service';
import { Row } from '../../grid/models/row';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import { ITerm } from '../models/term';

@Injectable()
export class TermGridService {
  private entityIdField = 'id';
  private allRows$: BehaviorSubject<Row[]> = new BehaviorSubject([]);
  rows$: Observable<Row[]>;

  submitRow(row: Row): void {
    const id = row.getId();
    this.termApiService
      .update(id, row.data)
      .subscribe();
  }

  constructor(private termApiService: TermApiService) {
    this.rows$ = this.allRows$.asObservable();
    this.termApiService
      .fetch()
      .subscribe((terms: ITerm[]) => this.allRows$.next(terms.map((term: ITerm) => new Row(term, this.entityIdField))));
  }

}
