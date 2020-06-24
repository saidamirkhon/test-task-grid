import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserContainerComponent {

}
