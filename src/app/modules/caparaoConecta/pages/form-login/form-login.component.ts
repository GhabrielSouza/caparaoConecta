import { IFormLogin } from './../../interface/IFormLogin.interface';

import { Component, OnInit, signal } from '@angular/core';

import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/inputs/primary-input/primary-input.component';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VPasswordValidator } from '../../validators/VPasswordValidator.validator';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { PasswordInputComponent } from '../../components/inputs/password-input/password-input.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectRegisterDialogComponent } from '../../components/dialogs/select-register-dialog/select-register-dialog.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
})
export class FormLoginComponent implements OnInit {
  public loginForm: FormGroup;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private _fb: FormBuilder,
    readonly dialog: MatDialog,
    private authLogin: AuthService,
    private route: Router
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          VPasswordValidator(),
        ],
      ],
    });

    const emailControl = this.email;
    if (emailControl) {
      merge(emailControl.statusChanges, emailControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('email'));
    }

    const passWordControl = this.password;
    if (passWordControl) {
      merge(passWordControl.statusChanges, passWordControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('password'));
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
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials = this.loginForm.value;

    this.authLogin.login(credentials).subscribe({
      next: (user) => {
        this.route.navigate(['/home']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.updateErrorMessage('email');
          this.updateErrorMessage('password');
          this.loginForm.setErrors({ email: error.error.message });
          this.loginForm.setErrors({ password: error.error.message });
        } else {
          this.loginForm.setErrors({
            email: 'Erro no servidor. Tente novamente mais tarde.',
          });
        }
      },
    });
  }

  navigate() {
    this.dialog.open(SelectRegisterDialogComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: 'Como você deseja se cadastrar?',
    });
  }
}
