import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TableComponent } from '../../components/table/table.component';
import { CursosSService } from '../../../../services/cursos/cursos-s.service';
import { ICursos } from '../../interface/ICursos.inteface';
import { DialogCursosAdminComponent } from '../../components/dialogs/dialog-cursos-admin/dialog-cursos-admin.component';
import { ITableColumn } from '../../interface/ITableColumn.interface';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ButtonReturnTopComponent } from '../../components/buttons/button-return-top/button-return-top.component';

@Component({
  selector: 'app-cursos',
  imports: [
    CabecalhoComponent,
    FooterComponent,
    TableComponent,
    ButtonReturnTopComponent,
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
})
export class CursosComponent implements OnInit {
  cursoData: ICursos[] = [];

  totalCursos = 0;

  currentPage = 0;
  pageSize = 5;

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

  ngOnInit(): void {
    this.onCursosListados();
  }

  constructor(private cursosService: CursosSService) {}

  onCursoRecebido(curso: ICursos) {
    return this.cursosService.httpCreateCursos$(curso).subscribe({
      next: (data) => {
        this.onCursosListados();
        Swal.fire({
          icon: 'success',
          title: 'Curso criado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao criar curso',
          text: error?.error?.message || 'Ocorreu um erro inesperado.',
        });
      },
    });
  }

  onCursoAtualizado(curso: ICursos) {
    return this.cursosService
      .httpUpdateCursos$(curso.id_cursos, curso)
      .subscribe({
        next: (data) => {
          this.onCursosListados();
          Swal.fire({
            icon: 'success',
            title: 'Curso atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao atualizar curso',
            text: error?.error?.message || 'Ocorreu um erro inesperado.',
          });
        },
      });
  }

  onCursoDeletado(id: number) {
    return this.cursosService.httpDeleteCursos$(id).subscribe({
      next: (data) => {
        this.onCursosListados();
      },
      error: (error) => {
        console.error('Erro ao deletar curso:', error);
      },
    });
  }

  onCursosListados() {
    const pageIndexForApi = this.currentPage + 1;
    return this.cursosService
      .httpListCursosPag$(pageIndexForApi, this.pageSize)
      .subscribe({
        next: (response) => {
          this.cursoData = response.data;
          this.totalCursos = response.total;
        },
        error: (error) => {
          console.error('Erro ao listar cursos:', error);
        },
      });
  }

  updatePaginatedData(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.onCursosListados(); // Certifique-se de que os dados sejam atualizados
  }

  onCursoStatusToggled(habilidade: ICursos) {
    return this.cursosService
      .httpStatusCursos$(habilidade.id_cursos)
      .subscribe({
        next: (data) => {
          this.onCursosListados();
          Swal.fire({
            icon: 'success',
            title: 'Status da habilidade atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao atualizar status da habilidade',
            text: error?.error?.message || 'Ocorreu um erro inesperado.',
          });
        },
      });
  }
}
