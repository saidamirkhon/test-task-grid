import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent {
  @Output() logOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleLogOut(): void {
    this.logOut.emit(true);
  }
}
