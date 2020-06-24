import { Injectable } from '@angular/core';

@Injectable()
export class UiNotificationService {
  show(message: string): void {
    alert(message);
  }

}
