import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TableCursosComponent } from '../../components/table-cursos/table-cursos.component';

@Component({
  selector: 'app-cursos',
  imports: [CabecalhoComponent, FooterComponent, TableCursosComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {

}
