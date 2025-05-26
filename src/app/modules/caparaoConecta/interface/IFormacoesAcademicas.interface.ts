import { IInstituicao } from "./IInstuicao.interface";

export interface IFormacoesAcademicas {
  id_formacoes_academicas?: string;
  escolaridade: string;
  area_de_estudo: string;
  diploma_formacao: boolean;
  conclusao_formacao: boolean;
  data_emissao: string;
  data_conclusao: string;
  instituicao: IInstituicao;
}
