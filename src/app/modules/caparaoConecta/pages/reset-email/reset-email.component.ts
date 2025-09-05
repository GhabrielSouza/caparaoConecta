import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { PrimaryInputComponent } from '../../components/inputs/primary-input/primary-input.component';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { MatError } from '@angular/material/form-field';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-email',
  imports: [
    PrimaryInputComponent,
    DefaultLoginLayoutComponent,
    MatError,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-email.component.html',
  styleUrl: './reset-email.component.scss',
})
export class ResetEmailComponent {
  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    readonly dialog: MatDialog,
    private authLogin: AuthService,
    private route: Router
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    const emailControl = this.email;
    if (emailControl) {
      merge(emailControl.statusChanges, emailControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('email'));
    }
  }

  ngOnInit(): void {}

  public errorMessages: Record<string, string> = {
    required: 'Este campo não pode estar vazio.',
    email: 'Por favor, preencha um email válido.',
    minlength: 'O campo deve ter pelo menos 6 caracteres',
    maxlength: 'O campo deve ter menos que 15 caracteres',
  };

  public fieldErrors = signal<Record<string, string>>({});

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  updateErrorMessage(field: any) {
    const control = this.loginForm.get(field);

    if (!control || !control.errors) {
      this.fieldErrors.update((errors) => ({
        ...errors,
        [field]: '',
      }));
      return;
    }

    const errorKey = Object.keys(control.errors)[0];
    this.fieldErrors.update((errors) => ({
      ...errors,
      [field]: this.errorMessages[errorKey],
    }));
  }

  submit() {
    if (this.loginForm.valid) {
      console.log('formulario válido');
    }

    return this.authLogin.forgotPassword(this.email?.value).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Enviando...',
          text: 'Aguarde enquanto processamos sua solicitação.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();

            setTimeout(() => {
              Swal.fire({
                icon: 'success',
                title: 'Email enviado',
                text: 'Verifique sua caixa de entrada para redefinir sua senha.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#359830',
              });
            }, 2000);
          },
        });
      },
      error: (err) => {
        console.error('Erro ao enviar email de redefinição:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível enviar o email de redefinição. Tente novamente mais tarde.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#359830',
        });
      },
    });
  }

  navigate() {}
}
