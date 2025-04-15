export interface ICursos {
  id_cursos?: number;
  nome_curso: string;
  carga_horaria: number;
  tipo_curso: string;
  data_inicio: string;
  data_conclusao: string;
  id_instituicoes?: number;
  certificado_curso?: boolean;
}
