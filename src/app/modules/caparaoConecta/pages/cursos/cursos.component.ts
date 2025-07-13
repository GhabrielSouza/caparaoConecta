import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TableCursosComponent } from '../../components/table-cursos/table-cursos.component';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-cursos',
  imports: [CabecalhoComponent, FooterComponent, TableComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
})
export class CursosComponent {
  // cursosColumns = [
  //   { header: 'Nome do Curso', property: 'nome' },
  //   { header: 'Carga horária', property: 'carga' },
  //   { header: 'Instituição', property: 'instituicao' },
  //   { header: 'Tipo', property: 'tipo_de_curso' },
  //   { header: 'Link', property: 'link' },
  // ];

  cursosColumns: string[] = [
    'Nome do Curso',
    'Nome do Curso',
    'Nome do Curso',
    'Tipo',
    'Link',
    'Status',
  ];
}
