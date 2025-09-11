export interface INotificacoes {
  id: number;
  titulo: string;
  tipo: string;
  dados: IDadosVaga;
  created_at: Date;
  data_leitura: Date;
}

export interface IDadosVaga {
  candidato_id: number;
  candidato_nome: string;
  nome_empresa: string;
  id_vagas: number;
  titulo_vaga: string;
}
