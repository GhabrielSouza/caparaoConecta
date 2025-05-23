import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { FormExperienciaProfissionalComponent } from '../dialogs/form-experiencia-profissional/form-experiencia-profissional.component';
import { IExperiencia } from '../../interface/IExperiencias.interface';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { ExperienciasService } from '../../../../services/experiencias/experiencias.service';

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

  private dialog = inject(MatDialog);
  private apiExperiencia = inject(ExperienciasService);
  

  openEditDialog(): void {
    this.dialog.open(FormExperienciaProfissionalComponent, {
      width: '600px',
      data: {experiencia: this.data}
    });
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: `Tem certeza que deseja excluir a experiência em ${this.data.nome_empresa}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteExperience();
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
    
    // Exemplo:
    // this.experienciaService.delete$(this.data.id).subscribe(...);
  }
}
