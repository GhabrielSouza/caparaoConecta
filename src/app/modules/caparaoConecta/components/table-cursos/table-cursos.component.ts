import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table-cursos',
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './table-cursos.component.html',
  styleUrl: './table-cursos.component.scss'
})
export class TableCursosComponent {

  cursos = [
    { nome: 'Administração', carga: '10 horas', instituicao: 'IFES', tipo_de_curso: 'EAD', link: 'htttp', status: 'Ativo'},
    { nome: 'TADS', carga: '05 horas', instituicao: 'UFES', tipo_de_curso: 'EAD', link: 'http', status: 'Ativo'},
    { nome: 'Agronomia', carga: '12 horas', instituicao: 'UFMG', tipo_de_curso: 'Presencial', link: 'http', status: 'Inativo'} 
  ];
}
