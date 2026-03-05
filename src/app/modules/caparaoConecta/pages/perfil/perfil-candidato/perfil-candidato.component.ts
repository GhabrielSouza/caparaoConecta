import { FormacoesAcademicasService } from './../../../../../services/formacoes/formacoes-academicas.service';
import { Component, Input, OnInit } from '@angular/core';
import { ComponentDefaultPerfilComponent } from '../../../components/component-default-perfil/component-default-perfil.component';

import { MatChipsModule } from '@angular/material/chips';

import { CommonModule } from '@angular/common';
import { IExperiencia } from '../../../interface/IExperiencias.interface';
import { IFormacoesAcademicas } from '../../../interface/IFormacoesAcademicas.interface';
import { ICursos } from '../../../interface/ICursos.inteface';
import { IHabilidades } from '../../../interface/IHabilidades.interface';
import { CardDefaultInformacoesComponent } from '../../../components/cards/card-default-informacoes/card-default-informacoes.component';
import { ICursosOnPessoas } from '../../../interface/ICursosOnPessoas.inteface';
import { concatMap, shareReplay } from 'rxjs';
import Swal from 'sweetalert2';
import { ExperienciasService } from '../../../../../services/experiencias/experiencias.service';
import { CursosSService } from '../../../../../services/cursos/cursos-s.service';
import { HabilidadesSService } from '../../../../../services/habilidades/habilidades-s.service';
import { IHabilidadesOnPessoas } from '../../../interface/IHabilidadesOnPessoas.interface';

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
export class PerfilCandidatoComponent implements OnInit {
  @Input() experiencias: IExperiencia[] | null = [];
  @Input() formacoes: IFormacoesAcademicas[] | null = [];
  @Input() cursos: ICursos[] | null = [];
  @Input() habilidades: IHabilidades[] | null = [];

  @Input() IdUsuario: any;

  @Input() isEditable: boolean = false;

  constructor(
    private experienciaService: ExperienciasService,
    private formacaoService: FormacoesAcademicasService,
    private cursosService: CursosSService,
    private habilidadesService: HabilidadesSService
  ) {}

  ngOnInit(): void {}

  public onCreateExperiencia(event: IExperiencia) {
    return this.experienciaService
      .httpRegisterExperiencia$(event)
      .pipe(
        concatMap(() =>
          this.experienciaService.httpListExperienciaId$(this.IdUsuario)
        )
      )
      .subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Experiência cadastrada com sucesso!',
            showConfirmButton: false,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: 'Ocorreu um erro ao cadastrar Experiência ',
            confirmButtonText: 'OK',
            confirmButtonColor: '#359830',
          });
        },
      });
  }

  public onCreateFormacao(event: IFormacoesAcademicas) {
    return this.formacaoService
      .httpRegisterFormacoes$(event)
      .pipe(
        concatMap(() =>
          this.formacaoService.httpListFormacoesId$(this.IdUsuario)
        )
      )
      .subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Formação acadêmica cadastrada com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Erro ao cadastrar formação acadêmica',
            text: 'Ocorreu um erro ao cadastrar a formação acadêmica. Por favor, tente novamente.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#359830',
          });
        },
        complete: () => {},
      });
  }

  public onCreateCurso(event: ICursosOnPessoas) {
    return this.cursosService
      .httpCreateCursosOnPessoa$(event)
      .pipe(
        shareReplay(),
        concatMap(() =>
          this.cursosService.httpListCursosOnPessoaId$(this.IdUsuario)
        )
      )
      .subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            text: 'Curso cadastrado com sucesso',
            showConfirmButton: false,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: 'Erro ao cadastrar curso',
            confirmButtonText: 'OK',
            confirmButtonColor: '#359830',
          });
        },
      });
  }

  public onCreateHabilidades(event: IHabilidadesOnPessoas) {
    this.habilidadesService
      .httpCreateHabilidadesOnPessoas$(event)
      .pipe(
        concatMap(() =>
          this.habilidadesService.httpListHabilidadesOnPessoas$(this.IdUsuario)
        )
      )
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Habilidades salvas com sucesso',
            text: 'Atualize a página para ver as mudanças',
            showConfirmButton: false,
          });
        },
        error: (error) => {
          console.error('Erro ao salvar habilidades', error);
          Swal.fire({
            icon: 'error',
            text: 'Erro ao cadastrar habilidade',
            confirmButtonText: 'OK',
            confirmButtonColor: '#359830',
          });
        },
      });
  }

  public onUpdateFormacao(event: IFormacoesAcademicas) {
    return this.formacaoService
      .httpUpdateFormacoes$(event.id_formacoes_academicas, event)
      .pipe(
        shareReplay(),
        concatMap(() =>
          this.formacaoService.httpListFormacoesId$(this.IdUsuario)
        )
      )
      .subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Formação acadêmica atualizada com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title:
              'Ocurreu um erro ao cadastrar formação. Por favor, tente novamente.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#359830',
          });
        },
      });
  }

  public onUpdateExperiencia(event: IExperiencia) {
    return this.experienciaService
      .httpUpdateExperiencia$(event.id_experiencias, event)
      .pipe(
        shareReplay(),
        concatMap(() =>
          this.experienciaService.httpListExperienciaId$(this.IdUsuario)
        )
      )
      .subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Experiência atualizada com sucesso!',
            showConfirmButton: false,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: 'Erro ao atualizar Experiencia',
            confirmButtonText: 'OK',
            confirmButtonColor: '#359830',
          });
        },
      });
  }

  public onUpdateCurso(event: ICursosOnPessoas) {
    return this.cursosService
      .httpUpdateCursosOnPessoa$(event, event.id_cursos)
      .pipe(
        shareReplay(),
        concatMap(() =>
          this.cursosService.httpListCursosOnPessoaId$(this.IdUsuario)
        )
      )
      .subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Curso atualizado com sucesso',
            text: 'Atualize a página para ver as mudanças',
            showConfirmButton: false,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: 'Erro ao atualizar curso',
            confirmButtonText: 'OK',
            confirmButtonColor: '#359830',
          });
        },
      });
  }
}
