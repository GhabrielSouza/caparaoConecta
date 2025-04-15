import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterModule } from '@angular/router';
import { DateInputComponent } from '../../inputs/date-input/date-input.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { MatSelectModule } from '@angular/material/select';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';

@Component({
  selector: 'app-dialog-cursos',
  imports: [
    MatButtonModule,
    MatDialogContent,
    RouterModule,
    MatCheckboxModule,
    PrimaryInputComponent, 
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule,
    ButtonPrimaryComponent,
  ],
  templateUrl: './dialog-cursos.component.html',
  styleUrl: './dialog-cursos.component.scss'
})
export class DialogCursosComponent {
  public form: FormGroup;
  
    constructor(
      private _dialogRef: MatDialogRef<DialogCursosComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string,
      private router: Router,
      private _fb: FormBuilder
    ) {
      this.form = this._fb.group({
        instituicao: ['', [Validators.required]],
        cargoHoraria: ['', [Validators.required]],
        nomeCurso: ['', [Validators.required]],
        diploma: [false],
        dateConclusao: [''],
      });
    }
  
    public closeModal() {
      this._dialogRef.close();
    }
}
