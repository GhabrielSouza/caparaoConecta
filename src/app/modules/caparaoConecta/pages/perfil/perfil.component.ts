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
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  dadosPessoais: any = {};
  dadosEmpresa: any = {};
  habilidades: any[] = [];
  experiencias: any[] = [];
  formacoes: any[] = [];
  sobre: any = {};
  cursos: any[] = [];
  id_tipo_usuario: string = '';

  constructor(private apiService: RegisterService) {}

  ngOnInit() {
    const idUsuario = 1; // Substitua pelo ID do usuário desejado
    this.id_tipo_usuario = '2'; // Substitua pelo ID do tipo de usuário desejado

    this.apiService.httpListCandidatosId$(idUsuario).subscribe((data) => {
      console.log(data);
    });
  }
}
