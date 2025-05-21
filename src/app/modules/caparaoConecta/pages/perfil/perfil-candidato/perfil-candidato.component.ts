import { Component, Input } from '@angular/core';
import { ComponentDefaultPerfilComponent } from '../../../components/component-default-perfil/component-default-perfil.component';
import { CardDefaultInformacoesComponent } from '../../../components/card-default-informacoes/card-default-informacoes.component';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-candidato',
  imports: [
    ComponentDefaultPerfilComponent,
    CardDefaultInformacoesComponent,
    MatChipsModule,
    CommonModule,
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
