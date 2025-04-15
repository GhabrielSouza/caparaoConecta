import { Requisitos } from "./IRequisitos.interface";

export interface Vaga {
    titulo: string;
    descricao: string;
    salario: number;
    status: number;
    dataCriacao: string;
    dataFechamento: string;
    quantidadeVagas: string;
    requisitos: Requisitos[];
    quantidadeVagasPreenchidas: string;
    imagem: string;
    modalidade: string;
    termo: number;
  }  