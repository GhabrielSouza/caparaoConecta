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
  selector: 'app-form-formacao-academica',
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    RouterModule,
    MatCheckboxModule,
    PrimaryInputComponent,
    DateInputComponent,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule,
    ButtonPrimaryComponent,
  ],
  templateUrl: './form-formacao-academica.component.html',
  styleUrl: './form-formacao-academica.component.scss',
})
export class FormFormacaoAcademicaComponent {
  public form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<FormFormacaoAcademicaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private router: Router,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      instituicao: ['', [Validators.required]],
      escolaridade: ['', [Validators.required]],
      areaEstudo: ['', [Validators.required]],
      conclusao: [false, [Validators.required]],
      diploma: [false],
      dateEmissao: ['', [Validators.required]],
      dateConclusao: [''],
    });
  }

  public closeModal() {
    this._dialogRef.close();
  }
}
