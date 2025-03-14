import { ViacepService } from './../../../../services/viacep.service';

import { Component,  OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';

import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { VPasswordConfirm } from '../../validators/VPasswordConfirm.validator';
import { VPasswordPattern } from '../../validators/VPasswordPattern.validator';
import ehUmCPF from '../../validators/VCpf.validator';


import { CpfAndCnpjInputComponent } from '../../components/inputs/cpf-and-cnpj-input/cpf-and-cnpj-input.component';
import { CepInputComponent } from '../../components/inputs/cep-input/cep-input.component';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/inputs/primary-input/primary-input.component';

import { GeneroInputComponent } from '../../components/inputs/genero-input/genero-input.component';

import { TelefoneInputComponent } from '../../components/inputs/telefone-input/telefone-input.component';
import { CadUnicoRadioComponent } from '../../components/inputs/cad-unico-radio/cad-unico-radio.component';
import { DataNascimentoInputComponent } from '../../components/inputs/data-nascimento-input/data-nascimento-input.component';


@Component({
  selector: 'app-form-cadastro-candidato',
  imports: [
    CommonModule,
    DefaultLoginLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TelefoneInputComponent,
    CpfAndCnpjInputComponent,
    CepInputComponent,
    DataNascimentoInputComponent,
    GeneroInputComponent,
    CadUnicoRadioComponent
  ],
  templateUrl: './form-cadastro-candidato.component.html',
  styleUrl: './form-cadastro-candidato.component.scss',
})
export class FormCadastroCandidatoComponent implements OnInit {
  // #fb = inject(FormBuilder);
  public cadastrarForm: FormGroup;

  constructor(private _fb: FormBuilder, private ViacepService: ViacepService) {
    this.cadastrarForm = this._fb.group(
      {
        nome: ['', [Validators.required]],
        dataDeNascimento: ['', [Validators.required]],
        genero: ['', [Validators.required]],
        cpf: ['', [Validators.required, ehUmCPF]],
        telefone: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        estado: ['', []],
        cidade: ['', []],
        email: ['', [Validators.required, Validators.email]],
        cadUnico: ['',[Validators.required]],
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

    const dataDeNascimentoControl = this.dataDeNascimento;
    if (dataDeNascimentoControl) {
      merge(dataDeNascimentoControl.statusChanges, dataDeNascimentoControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('dataDeNascimento'));
    }

    const generoControl = this.genero;
    if (generoControl) {
      merge(generoControl.statusChanges, generoControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('genero'));
    }

    const cpfControl = this.cpf;
    if (cpfControl) {
      merge(cpfControl.statusChanges, cpfControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('cpf'));
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

    const enderecoControl = this.cidade;
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

    const cadUnicoControl = this.cadUnico;
    if (cadUnicoControl) {
      merge(cadUnicoControl.statusChanges, cadUnicoControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('cadUnico'));
    }
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

  public errorMessages: Record<string, string> = {
    required: 'Este campo não pode estar vazio.',
    email: 'Por favor, preencha um email válido.',
    minlength: 'O campo deve ter pelo menos 6 caracteres',
    maxlength: 'O campo deve ter menos que 15 caracteres',
    Invalida: 'As senhas não coincidem.',
    cpfInvalido: 'Este CPF não é válido',
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

  get cadUnico() {
    return this.cadastrarForm.get('cadUnico');
  }

  get dataDeNascimento() {
    return this.cadastrarForm.get('dataDeNascimento');
  }

  get genero() {
    return this.cadastrarForm.get('genero');
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

  get cpf() {
    return this.cadastrarForm.get('cpf');
  }

  get telefone() {
    return this.cadastrarForm.get('telefone');
  }

  get estado() {
    return this.cadastrarForm.get('estado');
  }

  get cidade() {
    return this.cadastrarForm.get('cidade');
  }

  get cep() {
    return this.cadastrarForm.get('cep');
  }

  ngOnInit(): void {
    this.observerPreenchimentoCep();
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
}
