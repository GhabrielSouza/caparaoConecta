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

  openDialogFormacao(): void {
    this.#dialog.open(FormFormacaoAcademicaComponent, {
      panelClass: EDialogEnum.FORMACAO,
      data: 'Adicionar formação acadêmica',
    });
  }

  openDialog(): void {
    this.#dialog.open(FormExperienciaProfissionalComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: 'Adicionar experiência profissional',
    });
  }

  openDialogHabilidades(): void {
    this.#dialog.open(DialogHabilidadesComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: 'Adicionar habilidades',
    });
  }

  openDialogsSobre(): void {
    this.#dialog.open(DialogSobreComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: 'Atualizando a seção sobre',
    });
  }

  openDialogCursos(): void {
    this.#dialog.open(DialogCursosComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: 'Adicionar curso realizado',
    });
  }
}
