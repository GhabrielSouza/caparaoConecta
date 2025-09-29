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

import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

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
    MatSelectModule,
  ],
  templateUrl: './form-cadastro-empresa.component.html',
  styleUrl: './form-cadastro-empresa.component.scss',
})
export class FormCadastroEmpresaComponent implements OnInit {
  public cadastrarForm: FormGroup;
  public estados: any[] = [];
  public cidades: any[] = [];

  constructor(
    private _fb: FormBuilder,
    public router: Router,
    private apiService: RegisterService,
    private viacepService: ViacepService
  ) {
    this.cadastrarForm = this._fb.group(
      {
        nome: ['', [Validators.required]],
        cnpj: ['', [Validators.required]],
        telefone: ['', [Validators.required]],
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

  public carregarEstados() {
    this.cadastrarForm.get('cidade')?.disable();
    this.viacepService.getEstados().subscribe({
      next: (resp) => {
        this.estados = resp;
      },
      error: (error) => {
        console.log('Erro ao carregar estados', error);
      },
    });
  }

  public carregarCidadesPorEstado(idEstado: string) {
    if (idEstado) {
      this.cadastrarForm.get('cidade')?.reset();
      this.cadastrarForm.get('cidade')?.enable();

      this.viacepService.getMunicipioPorEstado(idEstado).subscribe({
        next: (resp) => {
          this.cidades = resp;
        },
        error: (error) => {
          console.log('Erro ao carregar cidades', error);
        },
      });
    }
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
    this.carregarEstados();
  }

  submit() {
    const formdata = { ...this.cadastrarForm.value };

    if (
      formdata.estado &&
      typeof formdata.estado === 'object' &&
      formdata.estado.nome
    ) {
      formdata.estado = formdata.estado.nome;
    }
    if (
      formdata.cidade &&
      typeof formdata.cidade === 'object' &&
      formdata.cidade.nome
    ) {
      formdata.cidade = formdata.cidade.nome;
    }

    if (this.cadastrarForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, preencha todos os campos obrigatórios.',
        confirmButtonColor: '#359830',
      });
      return;
    }

    return this.apiService.httpRegisterEmpresa$(formdata).subscribe({
      next: (resp) => {
        Swal.fire({
          title: 'Cadastrando...',
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: 'Você será redirecionado para a página de login.',
            confirmButtonColor: '#359830',
          });
        });
        this.router.navigate(['login']);
      },
      error: (resp) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp.error.message,
          confirmButtonColor: '#359830',
        });

        if (resp.status === 422 && resp.error?.error?.email) {
          this.cadastrarForm.get('email')?.setErrors({ emailTaken: true });
          this.fieldErrors.update((errors) => ({
            ...errors,
            email: 'Este email já foi cadastrado.',
          }));
        }
      },
    });
  }
}
