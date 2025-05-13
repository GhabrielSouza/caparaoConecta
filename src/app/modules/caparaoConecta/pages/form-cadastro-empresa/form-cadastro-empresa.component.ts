import { Component, inject, OnInit, signal } from '@angular/core';

import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/inputs/primary-input/primary-input.component';

import { ViacepService } from './../../../../services/viacep.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { VPasswordConfirm } from '../../validators/VPasswordConfirm.validator';
import { VPasswordPattern } from '../../validators/VPasswordPattern.validator';

import { CpfAndCnpjInputComponent } from '../../components/inputs/cpf-and-cnpj-input/cpf-and-cnpj-input.component';
import { CepInputComponent } from '../../components/inputs/cep-input/cep-input.component';
import { TelefoneInputComponent } from '../../components/inputs/telefone-input/telefone-input.component';
import { Router } from '@angular/router';
import { RegisterService } from '../../../../services/register-caparao/register.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-cadastro-empresa',
  imports: [
    DefaultLoginLayoutComponent,
    DefaultLoginLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TelefoneInputComponent,
    CpfAndCnpjInputComponent,
    CepInputComponent,
  ],
  templateUrl: './form-cadastro-empresa.component.html',
  styleUrl: './form-cadastro-empresa.component.scss',
})
export class FormCadastroEmpresaComponent implements OnInit {
  public cadastrarForm: FormGroup;
  

  constructor(
    private _fb: FormBuilder,
    private ViacepService: ViacepService,
    public router: Router,
    private messageService: MessageService,
    private apiService: RegisterService
  ) {
    this.cadastrarForm = this._fb.group(
      {
        nome: ['', [Validators.required]],
        cnpj: ['', [Validators.required]],
        telefone: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
            VPasswordPattern,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        id_tipo_usuarios: 3,
      },
      {
        validators: VPasswordConfirm,
      }
    );

    const emailControl = this.email;
    if (emailControl) {
      merge(emailControl.statusChanges, emailControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('email'));
    }

    const nomeControl = this.nome;
    if (nomeControl) {
      merge(nomeControl.statusChanges, nomeControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('nome'));
    }

    const cnpjControl = this.cnpj;
    if (cnpjControl) {
      merge(cnpjControl.statusChanges, cnpjControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('cnpj'));
    }

    const telefoneControl = this.telefone;
    if (telefoneControl) {
      merge(telefoneControl.statusChanges, telefoneControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('telefone'));
    }

    const passWordControl = this.password;
    if (passWordControl) {
      merge(passWordControl.statusChanges, passWordControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('password'));
    }

    const confirmPasswordControl = this.confirmPassword;
    if (confirmPasswordControl) {
      merge(
        confirmPasswordControl.statusChanges,
        confirmPasswordControl.valueChanges
      )
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('confirmPassword'));
    }

    const estadoControl = this.estado;
    if (estadoControl) {
      merge(estadoControl.statusChanges, estadoControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('estado'));
    }

    const enderecoControl = this.endereco;
    if (enderecoControl) {
      merge(enderecoControl.statusChanges, enderecoControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('endereco'));
    }

    const CepControl = this.cep;
    if (CepControl) {
      merge(CepControl.statusChanges, CepControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('cep'));
    }
  }

  public errorMessages: Record<string, string> = {
    required: 'Este campo não pode estar vazio.',
    email: 'Por favor, preencha um email válido.',
    minlength: 'O campo deve ter pelo menos 6 caracteres',
    maxlength: 'O campo deve ter menos que 15 caracteres',
    Invalida: ' As senhas não coincidem.',
  };

  public patternMessages: Record<string, string> = {
    uppercase: 'A senha deve conter pelo menos uma letra maiúscula.',
    lowercase: 'A senha deve conter pelo menos uma letra minúscula.',
    specialChar: 'A senha deve conter pelo menos um caractere especial.',
  };

  public fieldErrors = signal<Record<string, string>>({});

  get nome() {
    return this.cadastrarForm.get('nome');
  }

  get email() {
    return this.cadastrarForm.get('email');
  }

  get password() {
    return this.cadastrarForm.get('password');
  }

  get confirmPassword() {
    return this.cadastrarForm.get('confirmPassword');
  }

  get cnpj() {
    return this.cadastrarForm.get('cnpj');
  }

  get telefone() {
    return this.cadastrarForm.get('telefone');
  }

  get estado() {
    return this.cadastrarForm.get('estado');
  }

  get endereco() {
    return this.cadastrarForm.get('endereco');
  }

  get cep() {
    return this.cadastrarForm.get('cep');
  }

  public observerPreenchimentoCep() {
    this.cadastrarForm.get('cep')?.valueChanges.subscribe((value) => {
      if (value?.length == 9) {
        this.buscarCep();
      }
    });
  }

  public buscarCep() {
    const cep = this.cadastrarForm.get('cep')?.value.replace(/\.|-/g, '');
    this.ViacepService.getEnderecobyCep(cep).subscribe({
      next: (resp) => {
        this.cadastrarForm.patchValue({
          estado: resp.estado,
          cidade: resp.localidade,
        });
      },
      error: () => {
        console.log('erro ao buscar o cep');
      },
      complete: () => {
        console.log('completo');
      },
    });
  }

  updateErrorMessage(field: any) {
    const control = this.cadastrarForm.get(field);

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

  ngOnInit(): void {
    this.observerPreenchimentoCep();
  }

  navigate() {
    this.router.navigate(['login']);
  }

  submit() {
    return this.apiService
      .httpRegisterEmpresa$(this.cadastrarForm.value)
      .subscribe({
        next: (resp) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Cadastro realizado com sucesso',
          });
          this.router.navigate(['login']);
        },
        error: (resp) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro ao cadastrar',
          });
          console.log('erro ao cadastrar');
        },
      });
  }
}
