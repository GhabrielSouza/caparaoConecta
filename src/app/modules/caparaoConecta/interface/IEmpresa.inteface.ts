import { IPessoa } from "./IPessoa.interface";

export interface IEmpresa {
  id?: number;
  cnpj: string;
  pessoa: IPessoa;
}
