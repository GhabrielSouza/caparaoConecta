import { EStatusVaga } from '../enum/EStatusVaga.enum';
import { IAreasAtuacao } from './IAreasAtuacao.interface';
import { ICursos } from './ICursos.inteface';
import { IEmpresa } from './IEmpresa.inteface';
import { IHabilidades } from './IHabilidades.interface';
import { IRedesSociais } from './IRedesSociais.interface';

export interface IVaga {
  id_vagas: number;
  titulo_vaga: string;
  descricao: string;
  salario: number;
  area_atuacao: IAreasAtuacao;
  id_areas_atuacao: string;
  status: EStatusVaga;
  data_criacao: Date;
  data_fechamento: Date;
  qtd_vaga: number;
  qtd_vagas_preenchidas: number;
  modalidade_da_vaga: string;
  prorrogavel: boolean;
  id_empresas: number;
  habilidades?: IHabilidades[];
  curso: ICursos[];
  empresa: IEmpresa;
}
