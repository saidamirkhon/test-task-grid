import { NgModule } from '@angular/core';
import { RowComponent } from './components/row/row.component';
import { CellComponent } from './components/cell/cell.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridComponent } from './components/grid/grid.component';
import { ResizeWidthModule } from '../shared/components/resize-width/resize-width.module';
import { HeaderCellComponent } from './components/header-cell/header-cell.component';
import { AutoFocusDirectiveModule } from '../shared/directives/auto-focus.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ResizeWidthModule,
    AutoFocusDirectiveModule
  ],
  declarations: [
    RowComponent,
    CellComponent,
    GridComponent,
    HeaderCellComponent
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule {

}
