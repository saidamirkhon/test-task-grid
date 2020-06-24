import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { nonEmptyStringValidator } from '../../../shared/validators/non-empty-string-validator';
import { IUserAuthInfo } from '../../models/user-auth-info';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogInFormComponent {

  @Output() formSubmit: EventEmitter<IUserAuthInfo> = new EventEmitter();
  readonly form: FormGroup;

  createForm(): FormGroup {
    return this.formBuilder.group(
      {
        login: [
          '',
          [
            Validators.required
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            nonEmptyStringValidator
          ]
        ]
      }
    );
  }

  submitForm(): void {
    this.formSubmit.emit(this.getFormValue());
  }

  getFormValue(): IUserAuthInfo {
    const {login, password} = this.form.value;
    return {
      password,
      login
    };
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.createForm();
  }
}
