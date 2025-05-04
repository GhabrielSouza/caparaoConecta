import { Component, OnInit } from '@angular/core';
import { ComponentDefaultPerfilComponent } from '../../components/component-default-perfil/component-default-perfil.component';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentPerfilDadosComponent } from '../../components/component-perfil-dados/component-perfil-dados.component';
import { MatChipsModule } from '@angular/material/chips';
import { RegisterService } from '../../../../services/register-caparao/register.service';
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';
import { PerfilCandidatoComponent } from './perfil-candidato/perfil-candidato.component';

import { IPessoa } from '../../interface/IPessoa.interface';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
@Component({
  selector: 'app-perfil',
  imports: [
    ComponentDefaultPerfilComponent,
    CabecalhoComponent,
    FooterComponent,
    CommonModule,
    ComponentPerfilDadosComponent,
    MatChipsModule,
    PerfilEmpresaComponent,
    PerfilCandidatoComponent,
    SpinnerComponent,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  dadosPessoais!: IPessoa;
  dadosEmpresa: any = {};
  habilidades: any[] = [];
  experiencias: any[] = [];
  formacoes: any[] = [];
  sobre: any = {};
  cursos: any[] = [];
  id_tipo_usuario: string = '';

  idUsuario = 3;
  // Substitua pelo ID do usuário desejado
  // Substitua pelo ID do tipo de usuário desejado

  carregarDados: boolean = false;

  constructor(private apiService: RegisterService) {}

  ngOnInit() {
    this.apiService.httpListCandidatosId$(this.idUsuario).subscribe((data) => {
      console.log(data);
      this.dadosPessoais = data;
      this.sobre = data.sobre;
      this.id_tipo_usuario = this.dadosPessoais.usuario.id_tipo_usuarios;
      this.carregarDados = true;
      console.log(this.id_tipo_usuario);
    });
  }
}
