import { AbstractControl } from '@angular/forms';

export default function ehUmCPF(campo: AbstractControl) {
  if (!campo?.value) return null; // Verifica se o campo ou valor é nulo/undefined

  const cpf = campo.value.replace(/[^\d]/g, ''); // Remove tudo que não for dígito

  // Verifica se tem 11 dígitos ou se é uma sequência de números repetidos
  if (cpf.length !== 11 || validaNumerosRepetidos(cpf)) {
    return { cpfInvalido: true };
  }

  // Valida os dígitos verificadores
  if (!validaPrimeiroDigito(cpf) || !validaSegundoDigito(cpf)) {
    return { cpfInvalido: true };
  }

  return null; // CPF válido
}

function validaNumerosRepetidos(cpf: string): boolean {
  return /^(\d)\1{10}$/.test(cpf); // Usando regex para verificar números repetidos
}

function validaPrimeiroDigito(cpf: string): boolean {
  let soma = 0;
  let multiplicador = 10;

  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * multiplicador;
    multiplicador--;
  }

  const resto = (soma * 10) % 11;
  const digitoVerificador = resto === 10 || resto === 11 ? 0 : resto;

  return digitoVerificador === parseInt(cpf[9]);
}

function validaSegundoDigito(cpf: string): boolean {
  let soma = 0;
  let multiplicador = 11;

  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * multiplicador;
    multiplicador--;
  }

  const resto = (soma * 10) % 11;
  const digitoVerificador = resto === 10 || resto === 11 ? 0 : resto;

  return digitoVerificador === parseInt(cpf[10]);
}