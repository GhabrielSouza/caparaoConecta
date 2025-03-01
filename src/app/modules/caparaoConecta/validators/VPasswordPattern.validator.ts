import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const VPasswordPattern: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;

  const errors: ValidationErrors = {};

  if (!/[A-Z]/.test(value)) errors['uppercase'] = true;
  if (!/[a-z]/.test(value)) errors['lowercase'] = true;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors['specialChar'] = true;

  return Object.keys(errors).length ? errors : null;
};
