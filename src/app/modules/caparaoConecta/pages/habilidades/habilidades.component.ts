import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TableHabilidadesComponent } from '../../components/table-habilidades/table-habilidades.component';

@Component({
  selector: 'app-habilidades',
  imports: [CabecalhoComponent, FooterComponent, TableHabilidadesComponent],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.scss'
})
export class HabilidadesComponent {

}
