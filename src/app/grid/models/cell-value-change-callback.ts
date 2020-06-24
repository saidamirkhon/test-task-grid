import { ICellChange } from './cell-change';

export interface ICellValueChangeCallback {
  (event: ICellChange): void
}
