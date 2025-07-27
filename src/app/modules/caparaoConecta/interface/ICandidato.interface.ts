import { IAreasAtuacao } from './IAreasAtuacao.interface';
import { ICursos } from './ICursos.inteface';
import { IExperiencia } from './IExperiencias.interface';
import { IFormacoesAcademicas } from './IFormacoesAcademicas.interface';
import { IHabilidades } from './IHabilidades.interface';

export interface ICandidato {
  id?: number;
  sobrenome: string;
  genero: string;
  cpf: string;
  area_atuacao: IAreasAtuacao;
  id_areas_atuacao: number;
  cadUnico?: string;
  data_de_nascimento: string;
}
