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
import { LoginService } from '../../../../services/auth-caparao/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    PasswordInputComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
})
export class FormLoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    readonly dialog: MatDialog,
    private authLogin: LoginService,
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
    const { email, password } = this.loginForm.value;
    this.authLogin.httpLoginUser$(email, password).subscribe({
      next: (resp) => {
        if (resp.password === password) {
          sessionStorage.setItem('email', email);
          this.route.navigate(['']);
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('deu tudo certo!');
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
