import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { FormExperienciaProfissionalComponent } from '../dialogs/form-experiencia-profissional/form-experiencia-profissional.component';
import { IExperiencia } from '../../interface/IExperiencias.interface';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { ExperienciasService } from '../../../../services/experiencias/experiencias.service';
import { IFormacoesAcademicas } from '../../interface/IFormacoesAcademicas.interface';
import { FormFormacaoAcademicaComponent } from '../dialogs/form-formacao-academica/form-formacao-academica.component';
import { FormacoesAcademicasService } from '../../../../services/formacoes/formacoes-academicas.service';
import { ICursos } from '../../interface/ICursos.inteface';
import { DialogHabilidadesComponent } from '../dialogs/dialog-habilidades/dialog-habilidades.component';
import { DialogCursosComponent } from '../dialogs/dialog-cursos/dialog-cursos.component';

@Component({
  selector: 'app-card-default-informacoes',
  imports: [CommonModule],
  templateUrl: './card-default-informacoes.component.html',
  styleUrl: './card-default-informacoes.component.scss'
})
export class CardDefaultInformacoesComponent {
  @Input() public imagem = '';
  @Input() public cargo = 'Cargo';
  @Input() public empresa = 'Empresa';

  @Input() public data!:IExperiencia;
  @Input() public dataFormacoes!:IFormacoesAcademicas;
  @Input() public dataCursos!:ICursos;

  private dialog = inject(MatDialog);
  private apiExperiencia = inject(ExperienciasService);
  private apiFormacao = inject(FormacoesAcademicasService);

  openEditDialog(): void {
    this.dialog.open(FormExperienciaProfissionalComponent, {
      width: '600px',
      data: {experiencia: this.data}
    });
  }

  openEditDialogFormacao(): void {
    this.dialog.open(FormFormacaoAcademicaComponent, {
      width: '600px',
      data: {formacao: this.dataFormacoes}
    });
  }

  openEditDialogCurso(): void {
    this.dialog.open(DialogCursosComponent, {
      width: '600px',
      data: {formacao: this.dataCursos}
    });
  }

  confirmDelete(type: 'experiencia' | 'formacao' | 'curso'): void {
    let message = '';

    if(type === 'experiencia'){
      message = `Tem certeza que deseja excluir a experiência em ${this.data.nome_empresa}?`
    }

    if(type === 'formacao'){
      message = `Tem certeza que deseja excluir a formação em ${this.dataFormacoes.instituicao.nome}?`;
    }

    if(type === 'curso'){
      message = `Tem certeza que deseja excluir o curso em ${this.dataCursos.curso}?`;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(type === 'experiencia'){
          this.deleteExperience();
        }
    
        if(type === 'formacao'){
          this.deleteFormacao();
        }

        if(type === 'curso'){
          this.deleteFormacao();
        }
      }
    });
  }

  private deleteExperience(): void {
    this.apiExperiencia.httpDeleteExperiencia$(this.data.id_experiencias).subscribe({
      next:(data)=>{
        console.log(`essa experiencia com o nome ${this.data.nome_empresa} foi excluido`)
        console.log(data)
      },
      error: (error)=>{
        console.log(error)
      },
    })
  }

  private deleteFormacao():void{
    this.apiFormacao.httpDeleteFormacoes$(this.dataFormacoes.id_formacoes_academicas).subscribe({
      next:(data)=>{
        console.log(`essa formação com o nome ${this.dataFormacoes.instituicao.nome} foi excluido`)
        console.log(data)
      },
      error: (error)=>{
        console.log(error)
      },
    })
  }
}
