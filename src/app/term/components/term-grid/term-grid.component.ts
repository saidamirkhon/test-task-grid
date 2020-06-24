import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { Observable } from 'rxjs';
import { ICell } from '../../../grid/models/cell';
import { ITerm } from '../../models/term';
import { Row } from '../../../grid/models/row';
import { TermGridService } from '../../services/term-grid.service';

@Component({
  selector: 'app-term-grid',
  templateUrl: './term-grid.component.html',
  styleUrls: ['./term-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermGridComponent {
  cellTitles: string[] = [];
  cells: ICell<ITerm>[] = [];
  rows$: Observable<Row[]> = this.termGridService.rows$;

  onSubmitRow(row: Row) {
    this.termGridService.submitRow(row);
  }

  constructor(private termGridService: TermGridService) {
    this.cellTitles = [...Array(10)].map((_, index) => `field${index + 1}`);
    this.cells = this.cellTitles.map((cellTitle: string) => ({editable: true, key: cellTitle}));
  }

}
