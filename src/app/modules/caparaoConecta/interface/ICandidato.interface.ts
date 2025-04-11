import { ICursos } from "./ICursos.inteface";
import { IExperiencia } from "./IExperiencias.interface";
import { IFormacoesAcademicas } from "./IFormacoesAcademicas.interface";
import { IHabilidades } from "./IHabilidades.interface";

export interface ICandidato {
  id?: number;
  nome: string;
  sobrenome: string;
  genero: string;
  cpf: string;
  telefone: string;
  cep: string;
  cadUnico?: string;
  data_de_nascimento: string;
  tipo_usuario?: string;
  estado: string;
  cidade: string;
  endereco?: string;
  sobre?: string;
  imagem?: File;
  instagram?: string;
  github?: string;
  linkdin?: string;
  curriculo_lattes?: string;
  email: string;
  password: string;
  formacoes?: IFormacoesAcademicas[];
  experiencias?: IExperiencia[];
  cursos?:ICursos[];
  habilidades?: IHabilidades[];
}
