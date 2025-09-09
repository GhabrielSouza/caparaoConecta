import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { SelectRegisterDialogComponent } from '../select-register-dialog/select-register-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { DateInputComponent } from '../../inputs/date-input/date-input.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { RegisterService } from '../../../../../services/register-caparao/register.service';
import { concat, concatMap } from 'rxjs';
import { IconField } from 'primeng/iconfield';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-sobre',
  imports: [
    MatButtonModule,
    MatDialogContent,
    RouterModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    ButtonPrimaryComponent,
  ],
  templateUrl: './dialog-sobre.component.html',
  styleUrl: './dialog-sobre.component.scss',
})
export class DialogSobreComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<DialogSobreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private _fb: FormBuilder,
    private apiService: RegisterService
  ) {
    this.form = this._fb.group({
      sobre: [''],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.form.patchValue({
        sobre: this.data.conteudo,
      });
    }
  }

  public submit() {
    return this.apiService
      .httpUpdatePessoaSobre$(this.data.id, this.form.value.sobre)
      .subscribe({
        next: (data) => {
          this._dialogRef.close(data);
          Swal.fire({
            icon: 'success',
            text: 'Informações atualizadas com sucesso',
            showConfirmButton: false,
          });
        },
        error: (error) => {
          console.error('Error updating data', error);
          Swal.fire({
            icon: 'error',
            text: 'Erro',
            confirmButtonText: 'OK',
            confirmButtonColor: '#359830',
          });
        },
        complete: () => {
          console.log('Update complete');
        },
      });
  }

  public closeModal() {
    this._dialogRef.close();
  }
}
