import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TableComponent } from '../../components/table/table.component';
import { CursosSService } from '../../../../services/cursos/cursos-s.service';
import { ICursos } from '../../interface/ICursos.inteface';
import { DialogCursosAdminComponent } from '../../components/dialogs/dialog-cursos-admin/dialog-cursos-admin.component';
import { ITableColumn } from '../../interface/ITableColumn.interface';

@Component({
  selector: 'app-cursos',
  imports: [CabecalhoComponent, FooterComponent, TableComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
})
export class CursosComponent {
  cursoData: ICursos[] = [];

  cursosColumns: ITableColumn<ICursos>[] = [
    { key: 'curso', header: 'Curso' },

    {
      key: 'instituicao',
      header: 'Instituição',
      cell: (item) => item.instituicao.nome,
    },
    { key: 'cargo_horaria', header: 'Carga Horária' },

    {
      key: 'tipo_de_curso',
      header: 'Tipo de Curso',
      cell: (item) => item.tipo_de_curso.nome,
    },
    { key: 'link', header: 'Link' },
    { key: 'status', header: 'Status' },
  ];

  getIdCurso = (item: ICursos) => item.id_cursos;
  getNomeCurso = (item: ICursos) => item.curso;
  getStatusCurso = (item: ICursos) => item.status;

  CursosFormComponent = DialogCursosAdminComponent;

  constructor(private cursosService: CursosSService) {
    this.onCursosListados();
  }

  onCursoRecebido(curso: ICursos) {
    return this.cursosService.httpCreateCursos$(curso).subscribe({
      next: (data) => {
        console.log('Curso criado com sucesso:', data);
      },
      error: (error) => {
        console.error('Erro ao criar curso:', error);
      },
    });
  }

  onCursoAtualizado(curso: ICursos) {
    return this.cursosService
      .httpUpdateCursos$(curso.id_cursos, curso)
      .subscribe({
        next: (data) => {
          console.log('Curso atualizado com sucesso:', data);
        },
        error: (error) => {
          console.error('Erro ao atualizar curso:', error);
        },
      });
  }

  onCursoDeletado(id: number) {
    return this.cursosService.httpDeleteCursos$(id).subscribe({
      next: (data) => {
        console.log('Curso deletado com sucesso:', data);
      },
      error: (error) => {
        console.error('Erro ao deletar curso:', error);
      },
    });
  }

  onCursosListados() {
    return this.cursosService.httpListCursos$().subscribe({
      next: (data) => {
        console.log('Cursos listados com sucesso:', data);
        this.cursoData = data;
      },
      error: (error) => {
        console.error('Erro ao listar cursos:', error);
      },
    });
  }

  onCursoStatusToggled(habilidade: ICursos) {
    return this.cursosService
      .httpStatusCursos$(habilidade.id_cursos)
      .subscribe({
        next: (data) => {
          console.log('Status da habilidade atualizado:', data);
          this.onCursosListados();
        },
        error: (error) => {
          console.error('Erro ao atualizar status da habilidade:', error);
        },
      });
  }
}
