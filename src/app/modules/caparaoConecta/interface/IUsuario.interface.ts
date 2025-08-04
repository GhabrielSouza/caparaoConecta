import { ITipoUsuario } from './ITipoUsuario.interface';
import { IPessoa } from './IPessoa.interface';

export interface IUsuario {
  id_pessoas: number;
  email: string;
  password: string;
  id_tipo_usuarios: string;
  pessoa: IPessoa;
  tipo_usuario: ITipoUsuario;
}
