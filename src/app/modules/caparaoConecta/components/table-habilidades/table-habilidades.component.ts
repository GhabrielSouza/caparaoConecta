import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table-habilidades',
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './table-habilidades.component.html',
  styleUrl: './table-habilidades.component.scss'
})
export class TableHabilidadesComponent {

  habilidades = [
    { nome: 'Angular', status: 'Ativo' },
    { nome: 'Laravel', status: 'Ativo' },
    { nome: 'Java', status: 'Inativo' }
  ];

}
