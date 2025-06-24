import { Component, Inject } from '@angular/core';
import { HabilidadesSService } from '../../../../../services/habilidades/habilidades-s.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-habilidades-admin',
  imports: [
    ButtonPrimaryComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormFieldModule,
  ],
  templateUrl: './dialog-habilidades-admin.component.html',
  styleUrl: './dialog-habilidades-admin.component.scss',
})
export class DialogHabilidadesAdminComponent {
  public formHabilidade: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<DialogHabilidadesAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private habilidadesService: HabilidadesSService,
    private _fb: FormBuilder
  ) {
    this.formHabilidade = this._fb.group({
      habilidade: ['', Validators.required],
    });
  }

  submit() {
    this.habilidadesService
      .httpCreateHabilidadesOnPessoas$(this.formHabilidade.value)
      .subscribe({
        next: () => this._dialogRef.close(true),
        error: (error) => console.error('Erro ao salvar habilidades', error),
      });
  }

  closeModal() {
    this._dialogRef.close();
  }
}
