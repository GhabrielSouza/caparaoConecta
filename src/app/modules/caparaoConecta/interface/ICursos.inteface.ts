import { ICursosOnPessoas } from "./ICursosOnPessoas.inteface";

export interface ICursos {
  id_cursos: number;
  curso: string;
  cargo_horaria: number;
  tipo_curso: string;
  id_instituicoes?: number;
  pivot: ICursosOnPessoas;
}
