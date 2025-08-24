import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { DialogHabilidadesComponent } from '../dialog-habilidades/dialog-habilidades.component';
import { FiltroComponent } from '../../filtro/filtro.component';

@Component({
  selector: 'app-dialog-filtro',
  imports: [MatDialogContent, FiltroComponent, MatDialogActions],
  templateUrl: './dialog-filtro.component.html',
  styleUrl: './dialog-filtro.component.scss',
})
export class DialogFiltroComponent {
  constructor(
    private _dialogRef: MatDialogRef<DialogFiltroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal() {
    this._dialogRef.close();
  }
}
