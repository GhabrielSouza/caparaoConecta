
export interface IEmpresa{
  id?:number;
  nome: string;
  cnpj: string;
  telefone?: string;
  cep: string;
  estado: string;
  cidade: string;
  endereco?: string;
  email: string;
  password: string;
  sobre?:string;
  imagem?:File;
  tipo_usuario?:string;
  instragram?:string;
  linkedin?:string;
  github?:string;
  curriculo_lattes?:string;
}