import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { HabilidadesSService } from '../../../../../services/habilidades/habilidades-s.service';
import { DialogHabilidadesAdminComponent } from '../dialog-habilidades-admin/dialog-habilidades-admin.component';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-cursos-admin',
  imports: [
    ButtonPrimaryComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormFieldModule,
  ],
  templateUrl: './dialog-cursos-admin.component.html',
  styleUrl: './dialog-cursos-admin.component.scss',
})
export class DialogCursosAdminComponent {
  public formCurso: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<DialogHabilidadesAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private habilidadesService: HabilidadesSService,
    private _fb: FormBuilder
  ) {
    this.formCurso = this._fb.group({
      curso: ['', Validators.required],
      link: ['', Validators.required],
      instituicao: ['', Validators.required],
    });
  }

  submit() {
    this.habilidadesService
      .httpCreateHabilidadesOnPessoas$(this.formCurso.value)
      .subscribe({
        next: () => this._dialogRef.close(true),
        error: (error) => console.error('Erro ao salvar habilidades', error),
      });
  }

  closeModal() {
    this._dialogRef.close();
  }
}
