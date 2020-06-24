import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-term-container',
  templateUrl: './term-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermContainerComponent {

  logOut(): void {
    this.userService.logOut();
  }

  constructor(private userService: UserService) {
  }
}
