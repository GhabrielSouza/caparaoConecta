export interface IMunicipioIbge {
  id: number;
  nome: string;
  microrregiao: Microrregiao;
  'regiao-imediata': RegiaoImediata;
}

export interface Microrregiao {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}

export interface Mesorregiao {
  id: number;
  nome: string;
  UF: Uf;
}

export interface Uf {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

export interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}

export interface RegiaoImediata {
  id: number;
  nome: string;
  'regiao-intermediaria': RegiaoIntermediaria;
}

export interface RegiaoIntermediaria {
  id: number;
  nome: string;
  UF: Uf2;
}

export interface Uf2 {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao2;
}

export interface Regiao2 {
  id: number;
  sigla: string;
  nome: string;
}
