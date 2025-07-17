import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TableComponent } from '../../components/table/table.component';
import { CursosSService } from '../../../../services/cursos/cursos-s.service';
import { ICursos } from '../../interface/ICursos.inteface';

@Component({
  selector: 'app-cursos',
  imports: [CabecalhoComponent, FooterComponent, TableComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
})
export class CursosComponent {
  cursosColumns: string[] = [
    'Nome do Curso',
    'Nome do Curso',
    'Nome do Curso',
    'Tipo',
    'Link',
    'Status',
  ];

  constructor(private cursosService: CursosSService) {}

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

  onCursoAtualizado(id: string, curso: ICursos) {
    return this.cursosService.httpUpdateCursos$(id, curso).subscribe({
      next: (data) => {
        console.log('Curso atualizado com sucesso:', data);
      },
      error: (error) => {
        console.error('Erro ao atualizar curso:', error);
      },
    });
  }

  onCursoDeletado(id: string) {
    return this.cursosService.httpDeleteCursos$(id).subscribe({
      next: (data) => {
        console.log('Curso deletado com sucesso:', data);
      },
      error: (error) => {
        console.error('Erro ao deletar curso:', error);
      },
    });
  }
}
