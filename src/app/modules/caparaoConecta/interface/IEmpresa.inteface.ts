import { IPessoa } from './IPessoa.interface';
import { IVaga } from './IVaga.interface';

export interface IEmpresa {
  id?: number;
  cnpj: string;
  vagas: IVaga[];
  pessoa: IPessoa;
}
