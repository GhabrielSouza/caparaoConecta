import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { concatMap, identity, merge } from 'rxjs';

import { VPasswordConfirm } from '../../../validators/VPasswordConfirm.validator';
import { VPasswordPattern } from '../../../validators/VPasswordPattern.validator';

import { CepInputComponent } from '../../inputs/cep-input/cep-input.component';
import { CpfAndCnpjInputComponent } from '../../inputs/cpf-and-cnpj-input/cpf-and-cnpj-input.component';
import { DataNascimentoInputComponent } from '../../inputs/data-nascimento-input/data-nascimento-input.component';
import { GeneroInputComponent } from '../../inputs/genero-input/genero-input.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { TelefoneInputComponent } from '../../inputs/telefone-input/telefone-input.component';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { FileUpload, FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { RegisterService } from '../../../../../services/register-caparao/register.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ViacepService } from '../../../../../services/viacep.service';
import { IEstadoIbge } from '../../../interface/IEstadoIbge.interface';
import { IMunicipioIbge } from '../../../interface/IMunicipioIbge.interface';
import { IAreasAtuacao } from '../../../interface/IAreasAtuacao.interface';
import { AreasAtuacaoService } from '../../../../../services/areasAtuacao/areas-atuacao.service';

@Component({
  selector: 'app-dialog-perfil-informacoes',
  imports: [
    CommonModule,
    PrimaryInputComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TelefoneInputComponent,
    DataNascimentoInputComponent,
    GeneroInputComponent,
    MatDialogContent,
    ButtonPrimaryComponent,
    ToastModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-perfil-informacoes.component.html',
  styleUrl: './dialog-perfil-informacoes.component.scss',
  providers: [MessageService],
})
export class DialogPerfilInformacoesComponent implements OnInit {
  public cadastrarForm: FormGroup;

  estados: IEstadoIbge[] = [];
  cidades: IMunicipioIbge[] = [];

  areasAtuacao: IAreasAtuacao[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<DialogPerfilInformacoesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private messageService: MessageService,
    private apiService: RegisterService,
    private viacepService: ViacepService,
    private areasService: AreasAtuacaoService
  ) {
    this.cadastrarForm = this._fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      data_de_nascimento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      linkedin: ['', [Validators.required]],
      lattes: ['', [Validators.required]],
      github: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      estado: ['', []],
      cidade: ['', []],
      email: ['', [Validators.required, Validators.email]],
      id_areas_atuacao: [null],
      id_tipo_usuarios: this.data.idTipoUsuario,
    });

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

    const sobrenomeControl = this.sobrenome;
    if (sobrenomeControl) {
      merge(sobrenomeControl.statusChanges, sobrenomeControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('sobrenome'));
    }

    const dataDeNascimentoControl = this.dataDeNascimento;
    if (dataDeNascimentoControl) {
      merge(
        dataDeNascimentoControl.statusChanges,
        dataDeNascimentoControl.valueChanges
      )
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('data_de_nascimento'));
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

  ngOnInit() {
    this.carregarEstados();
    this.onListAreas();
  }

  public submit() {
    const formdata = this.cadastrarForm.value;
    console.log(formdata);
    formdata.estado = formdata.estado?.nome;
    return this.apiService
      .httpUpdateCandidato$(this.data.id, formdata)
      .pipe(
        concatMap(() => this.apiService.httpListCandidatosId$(this.data.id))
      )
      .subscribe({
        next: (resposta) => {
          console.log(resposta);
          this._dialogRef.close(resposta);
        },
        error: (error) => {
          console.error('Error updating data', error);
        },
      });
  }

  public onListAreas() {
    this.areasService.httpListAreas$().subscribe({
      next: (resp) => {
        this.areasAtuacao = resp;
      },
      error: (error) => {
        console.log('Erro ao carregar estados', error);
      },
    });
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

  get sobrenome() {
    return this.cadastrarForm.get('sobrenome');
  }

  get cadUnico() {
    return this.cadastrarForm.get('cadUnico');
  }

  get dataDeNascimento() {
    return this.cadastrarForm.get('data_de_nascimento');
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

  public closeModal(): void {
    this._dialogRef.close();
  }
}
