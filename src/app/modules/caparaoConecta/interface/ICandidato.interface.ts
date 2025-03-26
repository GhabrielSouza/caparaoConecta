export interface ICandidato{
    id?:number;
    nome: string;
    sobrenome:string;
    cpf: string;
    telefone: string;
    cep: string;
    cadUnico?:string;
    data_de_nascimento:string;
    tipo_usuario?:string;
    estado: string;
    cidade: string;
    endereco?: string;
    sobre?:string;
    imagem?:File;
    instagram?:string;
    github?:string;
    linkdin?:string;
    curriculo_lattes?:string;
    email: string;
    password: string;
  }