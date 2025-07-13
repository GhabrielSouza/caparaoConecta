import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-habilidades',
  imports: [CabecalhoComponent, FooterComponent, TableComponent],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.scss',
})
export class HabilidadesComponent {
  habilidadesColumns: string[] = [
    'Nome da Habilidade',
    'Status da Habilidade',
    'Status',
  ];
}
