import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { SelectRegisterDialogComponent } from '../select-register-dialog/select-register-dialog.component';
import { CadastroVagaDialogComponent } from '../cadastro-vaga-dialog/cadastro-vaga-dialog.component';
import { EDialogEnum } from '../../../enum/EDialogEnum.enum';
import { ReativarVagaComponent } from '../reativar-vaga/reativar-vaga.component';

@Component({
  selector: 'app-selecionar-vaga',
  imports: [MatButtonModule, MatDialogContent, RouterModule],
  templateUrl: './selecionar-vaga.component.html',
  styleUrl: './selecionar-vaga.component.scss',
})
export class SelecionarVagaComponent {
  #dialog = inject(MatDialog);

  constructor(
    private _dialogRef: MatDialogRef<SelecionarVagaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  openDialogNovaVaga(): void {
    this.#dialog.open(CadastroVagaDialogComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: {
        id: this.data.id,
      },
    });
  }

  openDialogReativarVaga(): void {
    this.#dialog.open(ReativarVagaComponent, {
      panelClass: EDialogEnum.PROJETOS,
      height: '600px',
      width: '900px',
      maxWidth: 'none',
    });
  }

  public closeModal(): void {
    this._dialogRef.close();
  }
}
