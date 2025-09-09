import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { VPasswordValidator } from '../../validators/VPasswordValidator.validator';
import { CommonModule } from '@angular/common';
import { MatError } from '@angular/material/form-field';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PasswordInputComponent } from '../../components/inputs/password-input/password-input.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatError,
    DefaultLoginLayoutComponent,
    PasswordInputComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  public loginForm: FormGroup;

  private token: string | null = null;
  private email: string | null = null;

  constructor(
    private _fb: FormBuilder,
    readonly dialog: MatDialog,
    private authLogin: AuthService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.loginForm = this._fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          VPasswordValidator(),
        ],
      ],
      confirm_password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          VPasswordValidator(),
        ],
      ],
    });

    const passwordControl = this.password;
    if (passwordControl) {
      merge(passwordControl.statusChanges, passwordControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('password'));
    }

    const passwordConfirmControl = this.confirm_password;
    if (passwordConfirmControl) {
      merge(
        passwordConfirmControl.statusChanges,
        passwordConfirmControl.valueChanges
      )
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('confirm_password'));
    }
  }

  ngOnInit(): void {
    this.token = this.router.snapshot.paramMap.get('token');

    this.email = this.router.snapshot.queryParamMap.get('email');
  }

  public errorMessages: Record<string, string> = {
    required: 'Este campo não pode estar vazio.',
    minlength: 'O campo deve ter pelo menos 6 caracteres',
    maxlength: 'O campo deve ter menos que 15 caracteres',
  };

  public fieldErrors = signal<Record<string, string>>({});

  get password() {
    return this.loginForm.get('password');
  }

  get confirm_password() {
    return this.loginForm.get('confirm_password');
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
    const data = {
      token: this.token,
      email: this.email,
      password: this.password?.value,
      password_confirmation: this.confirm_password?.value,
    };

    return this.authLogin.resetPassword(data).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Senha redefinida',
          text: 'Sua senha foi redefinida com sucesso. Você já pode fazer login com sua nova senha.',
          confirmButtonText: 'OK',
        });
        this.route.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao redefinir a senha:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível redefinir sua senha. Tente novamente mais tarde.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#359830',
        });
      },
    });
  }

  navigate() {}
}
