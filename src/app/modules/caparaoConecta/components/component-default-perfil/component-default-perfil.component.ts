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
import { IExperiencia } from '../../interface/IExperiencias.interface';
import { IFormacoesAcademicas } from '../../interface/IFormacoesAcademicas.interface';
import { IHabilidades } from '../../interface/IHabilidades.interface';
import { ICursos } from '../../interface/ICursos.inteface';

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
  @Input() public dataExperiencia: IExperiencia[] | null = [];
  @Input() public dataFormacao: IFormacoesAcademicas[] | null = [];
  @Input() public dataHabilidades: IHabilidades[] | null = [];
  @Input() public dataCursos: ICursos[] | null = [];

  @Input() isEditable: boolean = false;

  openDialogFormacao(): void {
    const dialogRef = this.#dialog.open(FormFormacaoAcademicaComponent, {
      panelClass: EDialogEnum.FORMACAO,
      data: {
        id: this.IdUsuario,
      },
    });

    dialogRef.afterClosed().subscribe((resposta: IFormacoesAcademicas[]) => {
      console.log(resposta);
      if (resposta) {
        this.dataFormacao = resposta;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.#dialog.open(FormExperienciaProfissionalComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: {
        id: this.IdUsuario,
      },
    });

    dialogRef.afterClosed().subscribe((resposta: IExperiencia[]) => {
      console.log(resposta);
      if (resposta) {
        this.dataExperiencia = resposta;
      }
    });
  }

  openDialogHabilidades(data: any): void {
    const dialogRef = this.#dialog.open(DialogHabilidadesComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: {
        habilidades: data,
        id: this.IdUsuario,
      },
    });

    dialogRef.afterClosed().subscribe((resposta: IHabilidades[]) => {
      console.log(resposta);
      if (resposta) {
        this.dataHabilidades = resposta;
      }
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
      data: {
        id: this.IdUsuario,
      },
    });
  }

  // Método para verificar se mostra o botão
  showAddButton(): boolean {
    if (!this.isEditable) {
      return false;
    }

    return [
      'Formação acadêmica',
      'Sobre',
      'Experiência profissional',
      'Habilidades e competências adicionais',
      'Cursos realizados',
    ].includes(this.title);
  }

  // Método único para lidar com todos os cliques
  handleButtonClick(): void {
    switch (this.title) {
      case 'Formação acadêmica':
        this.openDialogFormacao();
        break;
      case 'Sobre':
        this.openDialogsSobre(this.data);
        break;
      case 'Experiência profissional':
        this.openDialog();
        break;
      case 'Habilidades e competências adicionais':
        this.openDialogHabilidades(this.dataHabilidades);
        break;
      case 'Cursos realizados':
        this.openDialogCursos();
        break;
    }
  }
}
