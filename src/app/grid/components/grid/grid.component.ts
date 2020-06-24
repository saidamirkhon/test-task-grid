import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Observable } from 'rxjs';
import { ICell } from '../../models/cell';
import { Row } from '../../models/row';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  @Input() cellTitles: string[];
  @Input() cells: ICell<any>[] = [];
  @Input() rows$: Observable<Row[]>;
  @Output() submitRow: EventEmitter<Row> = new EventEmitter();

  onSubmitRow(row: Row): void {
    this.submitRow.emit(row);
  }

  trackRow(index: number, row: Row): number {
    return row.getId();
  }
}
