import {
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

export function nonEmptyStringValidator(control: AbstractControl): ValidationErrors {
  if (control.value && !control.value.toString()
    .trim().length) {
    return {
      nonEmptyString: true
    };
  }
  return null;
}
