import { ICursos } from "./ICursos.inteface";
import { IExperiencia } from "./IExperiencias.interface";
import { IFormacoesAcademicas } from "./IFormacoesAcademicas.interface";
import { IHabilidades } from "./IHabilidades.interface";

export interface ICandidato {
  id?: number;
  sobrenome: string;
  genero: string;
  cpf: string;

  cadUnico?: string;
  data_de_nascimento: string;
 
}
