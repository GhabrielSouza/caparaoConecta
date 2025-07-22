import { ICandidato } from './ICandidato.interface';
import { ICursos } from './ICursos.inteface';
import { IEmpresa } from './IEmpresa.inteface';
import { IEndereco } from './IEndereco.interface';
import { IExperiencia } from './IExperiencias.interface';
import { IFormacoesAcademicas } from './IFormacoesAcademicas.interface';
import { IHabilidades } from './IHabilidades.interface';
import { IRedesSociais } from './IRedesSociais.interface';
import { IUsuario } from './IUsuario.interface';

export interface IPessoa {
  id?: number;
  nome: string;
  sobre: string;
  telefone: string;
  imagem?: File;
  usuario: IUsuario;
  empresa?: IEmpresa;
  pessoas_fisica?: ICandidato;
  endereco?: IEndereco;
  rede_social?: IRedesSociais;
  formacoes?: IFormacoesAcademicas[];
  experiencias?: IExperiencia[];
  cursos: ICursos[];
  habilidades?: IHabilidades[];
}
