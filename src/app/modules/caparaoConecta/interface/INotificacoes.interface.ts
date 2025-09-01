export interface INotificacoes {
  id: number;
  titulo: string;
  dados: IDadosVaga;
  created_at: Date;
  lida: boolean;
}

export interface IDadosVaga {
  candidato_id: number;
  candidato_nome: string;
  id_vagas: number;
  titulo_vaga: string;
}
