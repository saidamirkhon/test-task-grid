import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { Row } from '../../models/row';
import { ICellChange } from '../../models/cell-change';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent implements AfterContentInit {
  @Output() submitRow: EventEmitter<Row> = new EventEmitter();
  @Input() row: Row;
  @ContentChildren(CellComponent) cells: QueryList<CellComponent>;

  ngAfterContentInit(): void {
    this.cells.forEach((cell: CellComponent) => {
      cell.valueChangeCallback = this.cellChange.bind(this);
      cell.cdr.detectChanges();
    });
  }

  private cellChange(event: ICellChange): void {
    this.row.data[event.key] = event.value;
    this.submitRow.emit(this.row);
  }
}
