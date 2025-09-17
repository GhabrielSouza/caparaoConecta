import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validDate(control: AbstractControl): ValidationErrors | null {
  const today = new Date();
  const birthDate = new Date(control.value);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return { invalidDate: true };
  }

  return age >= 18 ? null : { underage: true };
}
