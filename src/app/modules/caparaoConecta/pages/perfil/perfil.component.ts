import { Component, OnInit } from '@angular/core';
import { ComponentDefaultPerfilComponent } from '../../components/component-default-perfil/component-default-perfil.component';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { ComponentPerfilDadosComponent } from '../../components/component-perfil-dados/component-perfil-dados.component';
import { MatChipsModule } from '@angular/material/chips';
import { RegisterService } from '../../../../services/register-caparao/register.service';
import { CardDefaultInformacoesComponent } from '../../components/cards/card-default-informacoes/card-default-informacoes.component';
@Component({
  selector: 'app-perfil',
  imports: [
    ComponentDefaultPerfilComponent,
    CabecalhoComponent,
    FooterComponent,
    CardDefaultInformacoesComponent,
    CommonModule,
    ComponentPerfilDadosComponent,
    MatChipsModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  dadosPessoais: any = {};
  habilidades: any[] = [];
  experiencias: any[] = [];
  formacoes: any[] = [];
  sobre: any = {};
  cursos: any[] = [];

  constructor(private apiService: RegisterService) {}

  ngOnInit() {}
}
