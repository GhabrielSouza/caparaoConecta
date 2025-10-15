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
import { concatMap, forkJoin, identity, merge } from 'rxjs';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';

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

import Swal from 'sweetalert2';
import { validDate } from '../../../validators/VDate.validator';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-dialog-perfil-informacoes',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogContent,
    ButtonPrimaryComponent,
    ToastModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    MatSelectModule,
    NgxMaskDirective,
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

  generos: string[] = ['Masculino', 'Feminino', 'Outro', 'Prefiro não dizer'];

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
      data_de_nascimento: ['', [Validators.required, validDate]],
      genero: ['', [Validators.required]],
      instagram: [
        '',
        [
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
          ),
        ],
      ],
      linkedin: [
        '',
        [
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
          ),
        ],
      ],
      lattes: [
        '',
        [
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
          ),
        ],
      ],
      github: [
        '',
        [
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
          ),
        ],
      ],
      telefone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/
          ),
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      ],
      estado: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
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

    const instagramControl = this.instagram;
    if (instagramControl) {
      merge(instagramControl.statusChanges, instagramControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('instagram'));
    }

    const lattesControl = this.lattes;
    if (lattesControl) {
      merge(lattesControl.statusChanges, lattesControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('lattes'));
    }

    const githubControl = this.github;
    if (githubControl) {
      merge(githubControl.statusChanges, githubControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('github'));
    }

    const linkedinControl = this.linkedin;
    if (linkedinControl) {
      merge(linkedinControl.statusChanges, linkedinControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage('linkedin'));
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
        .subscribe(() => this.updateErrorMessage('cidade'));
    }
  }

  ngOnInit() {
    forkJoin({
      estados: this.viacepService.getEstados(),
      areas: this.areasService.httpListAreas$(),
    }).subscribe({
      next: (resultados) => {
        this.estados = resultados.estados;
        this.areasAtuacao = resultados.areas;

        if (this.data.id) {
          this.oldValue();
        }
      },
    });
  }

  public oldValue() {
    const conteudo = this.data.conteudo;
    this.cadastrarForm.patchValue({
      nome: this.data.conteudo.nome,
      telefone: this.data.conteudo.telefone,
      email: this.data.conteudo.usuario.email,
      instagram: this.data.conteudo.rede_social?.instagram || '',
      linkedin: this.data.conteudo.rede_social?.linkedin || '',
      lattes: this.data.conteudo.rede_social?.lattes || '',
      github: this.data.conteudo.rede_social?.github || '',
    });

    if (this.data.idTipoUsuario === 2 && conteudo.pessoas_fisica) {
      this.cadastrarForm.patchValue({
        sobrenome: this.data.conteudo.pessoas_fisica.sobrenome,
        data_de_nascimento:
          this.data.conteudo.pessoas_fisica?.data_de_nascimento,
        genero: this.data.conteudo.pessoas_fisica?.genero,
        id_areas_atuacao: this.data.conteudo.pessoas_fisica.id_areas_atuacao,
      });
    } else if (this.data.idTipoUsuario === 3) {
      this.cadastrarForm.patchValue({
        cnpj: this.data.conteudo.empresa?.cnpj,
      });
    }

    const nomeEstadoSalvo = conteudo.endereco?.estado;
    if (nomeEstadoSalvo) {
      const estadoCompleto = this.estados.find(
        (e) => e.nome === nomeEstadoSalvo
      );
      if (estadoCompleto) {
        this.cadastrarForm.get('estado')?.setValue(estadoCompleto);
        this.carregarCidadesPorEstado(estadoCompleto.id.toString());
      } else {
        // Recarregar estados se não encontrar o estado salvo
        this.carregarEstados();
      }
    }
  }

  public submit() {
    const formdata = { ...this.cadastrarForm.value };

    if (formdata.estado && typeof formdata.estado === 'object') {
      formdata.estado = formdata.estado.nome; // Enviar apenas a sigla do estado
    }

    if (formdata.cidade && typeof formdata.cidade === 'object') {
      formdata.cidade = formdata.cidade.nome; // Enviar apenas o nome da cidade
    }

    if (formdata.invalid) {
      Swal.fire({
        icon: 'error',
        text: 'Preencha todos os campos obrigatórios',
        confirmButtonColor: '#359830',
        confirmButtonText: 'OK',
      });
      return;
    }

    return this.apiService
      .httpUpdateCandidato$(this.data.id, formdata)
      .pipe(
        concatMap(() => this.apiService.httpListCandidatosId$(this.data.id))
      )
      .subscribe({
        next: (resposta) => {
          this._dialogRef.close(resposta);
          Swal.fire({
            icon: 'success',
            text: 'Informações atualizadas com sucesso',
            showConfirmButton: false,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: 'Erro ao atualizar informações do perfil',
            confirmButtonColor: '#359830',
            confirmButtonText: 'OK',
          });

          if (
            error.status === 422 &&
            error.error &&
            typeof error.error === 'object'
          ) {
            const fieldErrors: Record<string, string> = {};
            for (const key in error.error) {
              if (error.error.hasOwnProperty(key)) {
                fieldErrors[key] = error.error[key];
              }
            }
            this.fieldErrors.set(fieldErrors);
          }
        },
      });
  }

  public onListAreas() {
    this.areasService.httpListAreas$().subscribe({
      next: (resp) => {
        this.areasAtuacao = resp;

        this.carregarEstados();
      },
    });
  }

  public carregarEstados() {
    this.cadastrarForm.get('cidade')?.disable();
    this.viacepService.getEstados().subscribe({
      next: (resp) => {
        this.estados = resp;

        // Atualizar o estado no formulário, se necessário
        const nomeEstadoSalvo = this.data.conteudo.endereco?.estado;
        if (nomeEstadoSalvo) {
          const estadoCompleto = this.estados.find(
            (e) => e.nome === nomeEstadoSalvo
          );
          if (estadoCompleto) {
            this.cadastrarForm.get('estado')?.setValue(estadoCompleto);
            this.carregarCidadesPorEstado(estadoCompleto.id.toString());
          }
        }
      },
    });
  }

  public carregarCidadesPorEstado(idEstado: string) {
    if (idEstado) {
      const cidadeControl = this.cadastrarForm.get('cidade');
      cidadeControl?.reset();
      cidadeControl?.enable();

      this.viacepService.getMunicipioPorEstado(idEstado).subscribe({
        next: (resp) => {
          this.cidades = resp;
          const nomeCidadeSalva =
            this.data.conteudo.endereco?.cidade?.nome_cidade;

          if (nomeCidadeSalva) {
            const cidadeCompleta = this.cidades.find(
              (c) => c.nome === nomeCidadeSalva
            );
            if (cidadeCompleta) {
              cidadeControl?.setValue(cidadeCompleta);
            }
          }
        },
      });
    }
  }

  public compararEstados(o1: IEstadoIbge, o2: IEstadoIbge): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  public errorMessages: Record<string, string> = {
    required: 'Este campo não pode estar vazio.',
    email: 'Por favor, preencha um email válido.',
    minlength: 'O campo deve ter pelo menos 6 caracteres',
    maxlength: 'O campo deve ter menos que 15 caracteres',
    invalidDate: 'Data de nascimento inválida.',
    underage: 'Você precisa ter pelo menos 18 anos.',
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

  get lattes() {
    return this.cadastrarForm.get('lattes');
  }

  get github() {
    return this.cadastrarForm.get('github');
  }

  get linkedin() {
    return this.cadastrarForm.get('linkedin');
  }

  get instagram() {
    return this.cadastrarForm.get('intagram');
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
