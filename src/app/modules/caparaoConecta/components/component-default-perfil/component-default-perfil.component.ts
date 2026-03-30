import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
import { ICursosOnPessoas } from '../../interface/ICursosOnPessoas.inteface';
import { IHabilidadesOnPessoas } from '../../interface/IHabilidadesOnPessoas.interface';
import { IPessoa } from '../../interface/IPessoa.interface';

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

  @Output() public itemAddExperiencia = new EventEmitter<IExperiencia>();
  @Output() public itemAddFormacao = new EventEmitter<IFormacoesAcademicas>();
  @Output() public itemAddCurso = new EventEmitter<ICursosOnPessoas>();
  @Output() public itemAddHabilidade =
    new EventEmitter<IHabilidadesOnPessoas>();

  openDialogFormacao(): void {
    const dialogRef = this.#dialog.open(FormFormacaoAcademicaComponent, {
      panelClass: EDialogEnum.FORMACAO,
      data: {
        id: this.IdUsuario,
      },
    });

    dialogRef.afterClosed().subscribe((resposta: IFormacoesAcademicas) => {
      if (resposta) {
        this.itemAddFormacao.emit(resposta);
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

    dialogRef.afterClosed().subscribe((resposta: IExperiencia) => {
      if (resposta) {
        this.itemAddExperiencia.emit(resposta);
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

    dialogRef.afterClosed().subscribe((resposta: IHabilidadesOnPessoas) => {
      if (resposta) {
        if (resposta.id_habilidades && resposta.id_habilidades.length != 0) {
          this.itemAddHabilidade.emit(resposta);
        }
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
      if (novoSobre) {
        this.data = novoSobre;
      }
    });
  }

  openDialogCursos(): void {
    const dialogRef = this.#dialog.open(DialogCursosComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: {
        id: this.IdUsuario,
      },
    });

    dialogRef.afterClosed().subscribe((resposta: ICursosOnPessoas) => {
      if (resposta) {
        this.itemAddCurso.emit(resposta);
      }
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
