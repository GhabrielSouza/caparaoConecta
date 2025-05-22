import { Component, Input, OnInit } from '@angular/core';
import { ComponentDefaultPerfilComponent } from '../../../components/component-default-perfil/component-default-perfil.component';

import { MatChipsModule } from '@angular/material/chips';
import { CardDefaultInformacoesComponent } from '../../../components/card-default-informacoes/card-default-informacoes.component';
import { CommonModule } from '@angular/common';
import { IExperiencia } from '../../../interface/IExperiencias.interface';

@Component({
  selector: 'app-perfil-candidato',
  imports: [
    ComponentDefaultPerfilComponent,
    CardDefaultInformacoesComponent,
    MatChipsModule,
    CommonModule
  ],
  templateUrl: './perfil-candidato.component.html',
  styleUrls: ['./perfil-candidato.component.scss'],
})
export class PerfilCandidatoComponent implements OnInit {
  @Input() experiencias: IExperiencia[] = [];
  @Input() formacoes: any[] = [];
  @Input() cursos: any[] = [];
  @Input() habilidades: any[] = [];

  @Input() IdUsuario: any;

  ngOnInit(): void {
  
  }
}
