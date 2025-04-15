import { EStatusVaga } from "../enum/EStatusVaga.enum";

export interface IVagas {
    id_vagas: number;
    titulo_vaga: string;
    descricao: string;
    salario: number;
    status: EStatusVaga;
    data_criacao: Date;
    data_fechamento: Date;
    qtd_vaga: number;
    qtd_vagas_preenchidas: number;
    modalidade_da_vaga: string;
    id_empresa: number;
}
  