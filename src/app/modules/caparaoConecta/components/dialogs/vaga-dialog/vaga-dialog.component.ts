import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IVaga } from '../../../interface/IVaga.interface';
import { MatIcon } from '@angular/material/icon';
import { MatChipListbox, MatChip } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';

@Component({
  selector: 'app-vaga-dialog',
  imports: [
    MatIcon,
    MatDialogContent,
    MatChipListbox,
    MatChip,
    MatDialogActions,
    CommonModule,
    CapitalizePipe,
  ],
  templateUrl: './vaga-dialog.component.html',
  styleUrl: './vaga-dialog.component.scss',
})
export class VagaDialogComponent {
  @Input() public botaoCandidatar: string = '';
  @Input() public botaoSair: string = '';

  @Input() public imagem: string = 'assets/imgs/semFoto.jpg';

  favoritar: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<VagaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    console.log(data);
  }

  public closeModal(): void {
    this._dialogRef.close();
  }

  public favoritarVaga() {
    this.favoritar = !this.favoritar;
  }

  public candidatarUser() {
    this._dialogRef.close(this.data.vaga.id_vagas);
  }
}
