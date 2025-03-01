import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

let senhaCorreta = 123456;

export function VPasswordValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const password = control.get('password')?.value;

    if (!password) {
      return null;
    }

    return password !== senhaCorreta ? { senhaIncorreta: true } : null;
  };
}

// onde está o senhaCorreta é onde vai ficar o service getter para obter as credenciais e verificar se é igual ou não
