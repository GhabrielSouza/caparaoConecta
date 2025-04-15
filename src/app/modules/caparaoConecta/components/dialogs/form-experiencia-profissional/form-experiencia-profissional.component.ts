import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { SelectRegisterDialogComponent } from '../select-register-dialog/select-register-dialog.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { DateInputComponent } from '../../inputs/date-input/date-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-experiencia-profissional',
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
    ButtonPrimaryComponent,
    CommonModule,
  ],
  templateUrl: './form-experiencia-profissional.component.html',
  styleUrl: './form-experiencia-profissional.component.scss',
  standalone: true,
})
export class FormExperienciaProfissionalComponent {
  public formExperiencia: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<FormExperienciaProfissionalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private router: Router,
    private _fb: FormBuilder
  ) {
    this.formExperiencia = this._fb.group({
      cargo: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
      dateInicio: ['', [Validators.required]],
      dateTermino: ['', [Validators.required]],
      comprovacao: ['', [Validators.required]],
      comentario: [''],
      trabalhoAtual: [false],
    });
  }

  public closeModal() {
    this._dialogRef.close();
  }

  toggleDateTermino(event: MatCheckboxChange) {
    if (event.checked) {
      this.formExperiencia.get('dateTermino')?.disable();
      this.formExperiencia.get('dateTermino')?.setValue(null);
    } else {
      this.formExperiencia.get('dateTermino')?.enable();
    }
  }
}
