import { Component, inject, Input } from '@angular/core';
import { ButtonPrimaryComponent } from '../buttons/button-primary/button-primary.component';
import { MatDialog } from '@angular/material/dialog';
import { FormExperienciaProfissionalComponent } from '../dialogs/form-experiencia-profissional/form-experiencia-profissional.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { CommonModule } from '@angular/common';

import { FormFormacaoAcademicaComponent } from '../dialogs/form-formacao-academica/form-formacao-academica.component';
import { DialogHabilidadesComponent } from '../dialogs/dialog-habilidades/dialog-habilidades.component';
import { DialogSobreComponent } from '../dialogs/dialog-sobre/dialog-sobre.component';
import { DialogCursosComponent } from '../dialogs/dialog-cursos/dialog-cursos.component';

@Component({
  selector: 'app-component-default-perfil',
  imports: [ButtonPrimaryComponent, CommonModule],
  templateUrl: './component-default-perfil.component.html',
  styleUrl: './component-default-perfil.component.scss',
})
export class ComponentDefaultPerfilComponent {
  #dialog = inject(MatDialog);

  @Input() public title: string = '';
  @Input() public IdUsuario: any;
  @Input() public data: any;

  openDialogFormacao(data: any): void {
    this.#dialog.open(FormFormacaoAcademicaComponent, {
      panelClass: EDialogEnum.FORMACAO,
      data,
    });
  }

  openDialog(): void {
    this.#dialog.open(FormExperienciaProfissionalComponent, {
      panelClass: EDialogEnum.PROJETOS,
    });
  }

  openDialogHabilidades(): void {
    this.#dialog.open(DialogHabilidadesComponent, {
      panelClass: EDialogEnum.PROJETOS,
    });
  }

  openDialogsSobre(data: any): void {
    const dialogRef = this.#dialog.open(DialogSobreComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: {
        conteudo: data,
        id: this.IdUsuario,
      },
    });

    dialogRef.afterClosed().subscribe((novoSobre) => {
      console.log(novoSobre);
      if (novoSobre) {
        this.data = novoSobre;
      }
    });
  }

  openDialogCursos(): void {
    this.#dialog.open(DialogCursosComponent, {
      panelClass: EDialogEnum.PROJETOS,
    });
  }
}
