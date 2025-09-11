import { CommonModule } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IExperiencia } from '../../../interface/IExperiencias.interface';
import { IFormacoesAcademicas } from '../../../interface/IFormacoesAcademicas.interface';
import { ICursos } from '../../../interface/ICursos.inteface';
import { ExperienciasService } from '../../../../../services/experiencias/experiencias.service';
import { FormacoesAcademicasService } from '../../../../../services/formacoes/formacoes-academicas.service';
import { CursosSService } from '../../../../../services/cursos/cursos-s.service';
import { FormExperienciaProfissionalComponent } from '../../dialogs/form-experiencia-profissional/form-experiencia-profissional.component';
import { FormFormacaoAcademicaComponent } from '../../dialogs/form-formacao-academica/form-formacao-academica.component';
import { DialogCursosComponent } from '../../dialogs/dialog-cursos/dialog-cursos.component';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-card-default-informacoes',
  imports: [CommonModule],
  templateUrl: './card-default-informacoes.component.html',
  styleUrl: './card-default-informacoes.component.scss',
})
export class CardDefaultInformacoesComponent {
  @Input() public imagem = '';
  @Input() public cargo = 'Cargo';
  @Input() public empresa = 'Empresa';

  @Input() public data!: IExperiencia;
  @Input() public dataFormacoes!: IFormacoesAcademicas;
  @Input() public dataCursos!: ICursos;

  private dialog = inject(MatDialog);
  private apiExperiencia = inject(ExperienciasService);
  private apiFormacao = inject(FormacoesAcademicasService);
  private apiCurso = inject(CursosSService);

  @Input() public idUsuario: any;

  @Input() isEditable: boolean = false;

  openEditDialog(): void {
    this.dialog.open(FormExperienciaProfissionalComponent, {
      width: '600px',
      data: { experiencia: this.data },
    });
  }

  openEditDialogFormacao(): void {
    this.dialog.open(FormFormacaoAcademicaComponent, {
      width: '600px',
      data: { formacao: this.dataFormacoes },
    });
  }

  openEditDialogCurso(): void {
    this.dialog.open(DialogCursosComponent, {
      width: '600px',
      data: { curso: this.dataCursos },
    });
  }

  confirmDelete(type: 'experiencia' | 'formacao' | 'curso'): void {
    let message = '';

    if (type === 'experiencia') {
      message = `Tem certeza que deseja excluir a experiência em ${this.data.nome_empresa}?`;
    }

    if (type === 'formacao') {
      message = `Tem certeza que deseja excluir a formação em ${this.dataFormacoes.instituicao.nome}?`;
    }

    if (type === 'curso') {
      message = `Tem certeza que deseja excluir o curso em ${this.dataCursos.curso}?`;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: message,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (type === 'experiencia') {
          this.deleteExperience();
        }

        if (type === 'formacao') {
          this.deleteFormacao();
        }

        if (type === 'curso') {
          this.deleteCurso();
        }
      }
    });
  }

  private deleteExperience(): void {
    this.apiExperiencia
      .httpDeleteExperiencia$(this.data.id_experiencias)
      .subscribe({
        next: (data) => {
          console.log(
            `essa experiencia com o nome ${this.data.nome_empresa} foi excluido`
          );
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  private deleteFormacao(): void {
    this.apiFormacao
      .httpDeleteFormacoes$(this.dataFormacoes.id_formacoes_academicas)
      .subscribe({
        next: (data) => {
          console.log(
            `essa formação com o nome ${this.dataFormacoes.instituicao.nome} foi excluido`
          );
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  private deleteCurso(): void {
    this.apiCurso
      .httpDeleteCursosOnPessoa$(this.dataCursos.id_cursos, this.idUsuario)
      .subscribe({
        next: (data) => {
          console.log(
            `esse curso com o nome ${this.dataCursos.curso} foi excluido`
          );
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
