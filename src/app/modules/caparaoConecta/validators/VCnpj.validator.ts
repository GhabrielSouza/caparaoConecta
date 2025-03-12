import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ehUmCNPJ: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value) return null;

  const cnpj = control.value.replace(/\D/g, '');

  if (
    cnpj.length !== 14 ||
    validaNumerosRepetidos(cnpj) ||
    !validaPrimeiroDigito(cnpj) ||
    !validaSegundoDigito(cnpj)
  ) {
    return { cnpjInvalido: true };
  }

  return null;
};

function validaNumerosRepetidos(cnpj: string): boolean {
  return /^(\d)\1+$/.test(cnpj);
}

function validaPrimeiroDigito(cnpj: string): boolean {
  const pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;

  for (let i = 0; i < 12; i++) {
    soma += Number(cnpj[i]) * pesos[i];
  }

  let resto = soma % 11;
  let digitoVerificador = resto < 2 ? 0 : 11 - resto;

  return digitoVerificador === Number(cnpj[12]);
}

function validaSegundoDigito(cnpj: string): boolean {
  const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;

  for (let i = 0; i < 13; i++) {
    soma += Number(cnpj[i]) * pesos[i];
  }

  let resto = soma % 11;
  let digitoVerificador = resto < 2 ? 0 : 11 - resto;

  return digitoVerificador === Number(cnpj[13]);
}
