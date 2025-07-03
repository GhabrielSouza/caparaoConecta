import { ICandidato } from './ICandidato.interface';
import { ICursos } from './ICursos.inteface';
import { IEmpresa } from './IEmpresa.inteface';
import { IEndereco } from './IEndereco.interface';
import { IExperiencia } from './IExperiencias.interface';
import { IFormacoesAcademicas } from './IFormacoesAcademicas.interface';
import { IHabilidades } from './IHabilidades.interface';
import { IPessoa } from './IPessoa.interface';
import { IRedesSociais } from './IRedesSociais.interface';
import { IUsuario } from './IUsuario.interface';

export interface IPessoaFisica {
  id?: number;
  sobrenome: string;
  genero: string;
  cpf: string;
  cadUnico?: string;
  data_de_nascimento: string;
  pessoa: IPessoa;
}
