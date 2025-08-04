import { ICursosOnPessoas } from './ICursosOnPessoas.inteface';
import { IInstituicao } from './IInstuicao.interface';
import { ITipoDeCurso } from './ITipoDeCurso.interface';

export interface ICursos {
  id_cursos: number;
  curso: string;
  cargo_horaria: number;
  tipo_de_curso: ITipoDeCurso;
  status: string;
  link: string;
  id_instituicoes?: number;
  instituicao: IInstituicao;
  pivot: ICursosOnPessoas;
}
