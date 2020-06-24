import { NgModule } from '@angular/core';
import { TermContainerComponent } from './containers/term-container/term-container.component';
import { RouterModule } from '@angular/router';
import { termRoutes } from './term.routes';
import { HeaderNavModule } from '../shared/components/header-nav/header-nav.module';
import { TermGridComponent } from './components/term-grid/term-grid.component';
import { TermApiService } from './services/term-api.service';
import { TermGridService } from './services/term-grid.service';
import { CommonModule } from '@angular/common';
import { GridModule } from '../grid/grid.module';

@NgModule({
  declarations: [TermContainerComponent, TermGridComponent],
  imports: [CommonModule, HeaderNavModule, RouterModule.forChild(termRoutes), GridModule],
  providers: [
    TermApiService,
    TermGridService
  ]
})
export class TermModule {
}
