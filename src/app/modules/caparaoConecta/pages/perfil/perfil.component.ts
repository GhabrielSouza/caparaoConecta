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
import { ExperienciasService } from '../../../../services/experiencias/experiencias.service';
import { FormacoesAcademicasService } from '../../../../services/formacoes/formacoes-academicas.service';
import { HabilidadesSService } from '../../../../services/habilidades/habilidades-s.service';
import { CursosSService } from '../../../../services/cursos/cursos-s.service';
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

  idUsuario = 1;

  carregarDados: boolean = false;

  constructor(private apiService: RegisterService, private experienciaService: ExperienciasService, private formacoesService: FormacoesAcademicasService, private habilidadesService: HabilidadesSService, private cursosService:CursosSService) {}

  ngOnInit() {
    this.getDadosPessoais();
    this.getExperiencias();
    this.getFormacoes();
    this.getHabilidades();
    this.getCursos();
  }

  getDadosPessoais() {
    this.apiService.httpListCandidatosId$(this.idUsuario).subscribe((data) => {
      console.log(data);
      this.dadosPessoais = data;
      this.sobre = data.sobre;
      this.id_tipo_usuario = this.dadosPessoais.usuario.id_tipo_usuarios;
      this.carregarDados = true;
      console.log(this.id_tipo_usuario);
    });
  }

  getExperiencias() {
    this.experienciaService.httpListExperienciaId$(this.idUsuario).subscribe((data) => {
      this.experiencias = data;
      this.carregarDados = true;
    });
  }

  getFormacoes() {
    this.formacoesService.httpListFormacoesId$(this.idUsuario).subscribe((data) => {
      this.formacoes = data;
      this.carregarDados = true;
    });
  }

  getCursos() {
    this.cursosService.httpListCursosOnPessoaId$(this.idUsuario).subscribe((data) => {
      console.log(data);
      this.cursos = data;
      this.carregarDados = true;
    });
  }

  getHabilidades() {
    this.habilidadesService.httpListHabilidadesOnPessoas$(this.idUsuario).subscribe((data) => {
      this.habilidades = data;
      this.carregarDados = true;
    });
  }
}
