import { ICidade } from './ICidade.interface';

export interface IEndereco {
  cep: string;
  estado: string;
  cidade: ICidade;
}
