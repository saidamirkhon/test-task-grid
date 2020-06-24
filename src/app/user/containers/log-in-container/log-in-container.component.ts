import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppPaths } from '../../../app.paths';
import { UserService } from '../../../core/services/user.service';
import { IUserAuthInfo } from '../../models/user-auth-info';

@Component({
  selector: 'app-log-in-container',
  templateUrl: './log-in-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogInContainerComponent {
  logIn(userInfo: IUserAuthInfo): void {
    this.userService
      .logIn(userInfo)
      .subscribe(() => this.router.navigate([AppPaths.TERM]));
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

}
