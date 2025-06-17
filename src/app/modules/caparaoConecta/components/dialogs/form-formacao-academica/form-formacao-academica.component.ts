import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterModule } from '@angular/router';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { MatSelectModule } from '@angular/material/select';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { FormacoesAcademicasService } from '../../../../../services/formacoes/formacoes-academicas.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { concatMap, map, Observable, shareReplay, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { IFormacoesAcademicas } from '../../../interface/IFormacoesAcademicas.interface';
import { IInstituicao } from '../../../interface/IInstuicao.interface';
import { InstituicoesService } from '../../../../../services/instituicoes/instituicoes.service';

@Component({
  selector: 'app-form-formacao-academica',
  imports: [
    MatButtonModule,
    MatDialogContent,
    RouterModule,
    MatCheckboxModule,
    PrimaryInputComponent,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule,
    ButtonPrimaryComponent,
    MatAutocompleteModule,
    MatInputModule,
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './form-formacao-academica.component.html',
  styleUrl: './form-formacao-academica.component.scss',
})
export class FormFormacaoAcademicaComponent {
  public form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<FormFormacaoAcademicaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private _fb: FormBuilder,
    private formacaoService: FormacoesAcademicasService,
    private instituicaoService: InstituicoesService
  ) {
    this.form = this._fb.group({
      instituicao: ['', [Validators.required]],
      id_instituicoes: '',
      escolaridade: ['', [Validators.required]],
      area_de_estudo: ['', [Validators.required]],
      conclusao_formacao: [false, [Validators.required]],
      diploma_formacao: [false],
      data_emissao: ['', [Validators.required]],
      data_conclusao: [''],
      id_pessoasFisicas: this.data.id || this.data.formacao.id_pessoasFisicas
    });
  }

options: IInstituicao[] = [];
filteredOptions!: Observable<IInstituicao[]>;

ngOnInit() {
  this.getInstituicoes();

  if(this.data.formacao){
    this.loadFormData(this.data.formacao);
  }
}

private loadFormData(formacao: IFormacoesAcademicas): void {
  console.log(formacao)
  this.form.patchValue({
    instituicao: formacao.instituicao,
    id_instituicoes: formacao.instituicao.id_instituicoes,
    escolaridade: formacao.escolaridade,
    area_de_estudo: formacao.area_de_estudo,
    conclusao_formacao: Boolean(formacao.conclusao_formacao),
    diploma_formacao: Boolean(formacao.diploma_formacao),
    data_emissao: formacao.data_emissao,
    data_conclusao: formacao.data_conclusao,
  });

  // if (!formacao.data_conclusao) {
  //   this.form.get('data_conclusao')?.disable();
  // }
}

displayFn(instituicao: IInstituicao): string {
  return instituicao && instituicao.nome ? instituicao.nome : '';
}

private _filter(value: string): IInstituicao[] {
  const filterValue = value.toLowerCase();
  return this.options.filter(option => option.nome.toLowerCase().includes(filterValue));
}


  public closeModal() {
    this._dialogRef.close();
  }

  public submit() {
      const formData = this.form.value;
      console.log(formData)

      
      return this.formacaoService
        .httpRegisterFormacoes$(formData)
        .pipe(
          concatMap(() =>
            this.formacaoService.httpListFormacoesId$(this.data.id)
          )
        )
        .subscribe({
          next: (data) => {
            console.log('Lista atualizada:', data);
            this._dialogRef.close(data);
          },
          error: (error) => {
            console.error('Erro ao atualizar', error);
          },
          complete: () => {
            console.log('Finalizado');
          },
        });
    }

    public update() {
      const formData = this.form.value;
        console.log(this.form.value);
        return this.formacaoService.httpUpdateFormacoes$(
            this.data.formacao.id_formacoes_academicas,
            formData
          )
          .pipe(shareReplay())
          .subscribe({
            next: (data) => {
              console.log('Formacao atualizada' + data);
              this._dialogRef.close(data);
            },
            error: (error) => [console.log(error)],
          });
      }

    public getInstituicoes(){
      this.instituicaoService.httpListInstituicao$().subscribe({
        next: (data) => {
          this.options = data;
          this.filteredOptions = this.form.get('instituicao')!.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.nome;
              return name ? this._filter(name as string) : this.options.slice();
            }),
          );

          this.form.get('instituicao')?.valueChanges.subscribe(value => {
            if (value && typeof value === 'object') {
              this.form.get('id_instituicoes')?.setValue(value.id_instituicoes);
            }
          });

          if (this.data.formacao) {
            this.loadFormData(this.data.formacao);
          }
        },
        error: (error) => {
          console.error('Erro ao buscar instituições', error);
        }
      });
    }
}
