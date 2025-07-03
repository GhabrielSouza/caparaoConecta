import { Component, Input, OnInit } from '@angular/core';
import { ComponentDefaultPerfilComponent } from '../../../components/component-default-perfil/component-default-perfil.component';

import { MatChipsModule } from '@angular/material/chips';

import { CommonModule } from '@angular/common';
import { IExperiencia } from '../../../interface/IExperiencias.interface';
import { IFormacoesAcademicas } from '../../../interface/IFormacoesAcademicas.interface';
import { ICursos } from '../../../interface/ICursos.inteface';
import { IHabilidades } from '../../../interface/IHabilidades.interface';
import { CardDefaultInformacoesComponent } from '../../../components/cards/card-default-informacoes/card-default-informacoes.component';

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
  @Input() formacoes: IFormacoesAcademicas[] = [];
  @Input() cursos: ICursos[] = [];
  @Input() habilidades: IHabilidades[] = [];

  @Input() IdUsuario: any;

  ngOnInit(): void {
  
  }
}
