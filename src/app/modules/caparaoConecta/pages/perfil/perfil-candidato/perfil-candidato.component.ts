import { Component, Input } from '@angular/core';
import { ComponentDefaultPerfilComponent } from '../../../components/component-default-perfil/component-default-perfil.component';

import { MatChipsModule } from '@angular/material/chips';
import { CardDefaultInformacoesComponent } from '../../../components/cards/card-default-informacoes/card-default-informacoes.component';

@Component({
  selector: 'app-perfil-candidato',
  imports: [
    ComponentDefaultPerfilComponent,
    CardDefaultInformacoesComponent,
    MatChipsModule,
  ],
  templateUrl: './perfil-candidato.component.html',
  styleUrls: ['./perfil-candidato.component.scss'],
})
export class PerfilCandidatoComponent {
  @Input() experiencias: any[] = [];
  @Input() formacoes: any[] = [];
  @Input() cursos: any[] = [];
  @Input() habilidades: any[] = [];
}
