import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserContainerComponent } from './containers/user-container/user-container.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { LogInContainerComponent } from './containers/log-in-container/log-in-container.component';
import { userRoutes } from './user.routes';

@NgModule({
  declarations: [
    UserContainerComponent,
    LogInFormComponent,
    LogInContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes),
  ]
})
export class UserModule {
}
