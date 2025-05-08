import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; // necessário para ngModel
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  selected?: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', selected: false },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', selected: false },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', selected: false },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', selected: false },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', selected: false },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', selected: false },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', selected: false },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', selected: false },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', selected: false },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', selected: false },
];

@Component({
  selector: 'app-reativar-vaga',
  standalone: true,
  imports: [
    MatTableModule,
    MatDialogContent,
    RouterModule,
    ButtonPrimaryComponent,
    ReactiveFormsModule,
    FormsModule, // <- importante para ngModel funcionar
    MatCheckboxModule
  ],
  templateUrl: './reativar-vaga.component.html',
  styleUrl: './reativar-vaga.component.scss'
})
export class ReativarVagaComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'selecionar'];

  dataSource = ELEMENT_DATA;

  #dialog = inject(MatDialog);

  constructor(
    private _dialogRef: MatDialogRef<ReativarVagaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private router: Router
  ) {}

  toggleDateTermino(element: PeriodicElement): void {
    console.log(`${element.name} selecionado?`, element.selected);
  }

  public closeModal(): void {
    this._dialogRef.close();
  }
}
