import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
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
import { DateInputComponent } from '../../inputs/date-input/date-input.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { MatSelectModule } from '@angular/material/select';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { IInstituicao } from '../../../interface/IInstuicao.interface';
import { concatMap, map, Observable, shareReplay, startWith } from 'rxjs';
import { ICursos } from '../../../interface/ICursos.inteface';
import { InstituicoesService } from '../../../../../services/instituicoes/instituicoes.service';
import { CursosSService } from '../../../../../services/cursos/cursos-s.service';
import { ICursosOnPessoas } from '../../../interface/ICursosOnPessoas.inteface';
import { C } from '@angular/cdk/keycodes';
import Swal from 'sweetalert2';
import { validDate } from '../../../validators/VDate.validator';

@Component({
  selector: 'app-dialog-cursos',
  imports: [
    MatButtonModule,
    MatDialogContent,
    RouterModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule,
    ButtonPrimaryComponent,
    MatAutocompleteModule,
    MatInputModule,
    CommonModule,
    AsyncPipe,
  ],
  templateUrl: './dialog-cursos.component.html',
  styleUrl: './dialog-cursos.component.scss',
})
export class DialogCursosComponent {
  public form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<DialogCursosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private _fb: FormBuilder,
    private instituicaoService: InstituicoesService,
    private cursosService: CursosSService
  ) {
    this.form = this._fb.group({
      instituicao: ['', [Validators.required]],
      id_cursos: ['', [Validators.required]],
      certificado_curso: [false, [Validators.required]],
      data_conclusao: ['', [Validators.required, validDate]],
      id_pessoasFisicas:
        this.data.id || this.data.curso.pivot.id_pessoasFisicas,
    });
  }

  options: IInstituicao[] = [];
  filteredOptions!: Observable<IInstituicao[]>;

  optionsCursos: ICursos[] = [];
  filteredOptionsCursos!: Observable<ICursos[]>;

  ngOnInit() {
    this.getInstituicoes();
    this.onInstituicaoSelecionada(this.form.get('instituicao')?.value);

    if (this.data.curso) {
      this.loadFormData(this.data.curso);
    }

    this.form.get('certificado_curso')?.valueChanges.subscribe((value) => {
      const dataConclusaoControl = this.form.get('data_conclusao');
      if (value) {
        dataConclusaoControl?.setValidators([Validators.required]);
      } else {
        dataConclusaoControl?.clearValidators();
      }
      dataConclusaoControl?.updateValueAndValidity();
    });
  }

  private loadFormData(curso: any): void {
    this.form.patchValue({
      curso: curso.curso,
      certificado_curso: Boolean(curso.pivot.certificado_curso),
      data_conclusao: curso.pivot.data_conclusao,
    });

    // if (!formacao.data_conclusao) {
    //   this.form.get('data_conclusao')?.disable();
    // }
  }

  displayFnInstituicao(instituicao: any): string {
    return instituicao?.nome || '';
  }

  displayFnCurso(curso: any): string {
    return curso && typeof curso === 'object' ? curso.curso : curso;
  }

  private _filter(value: string): IInstituicao[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.nome.toLowerCase().includes(filterValue)
    );
  }

  private _filterCursos(value: string): ICursos[] {
    const filterValue = value.toLowerCase();
    return this.optionsCursos.filter((option) =>
      option.curso.toLowerCase().includes(filterValue)
    );
  }

  public closeModal() {
    this._dialogRef.close();
  }

  public submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    formData.id_cursos = formData.id_cursos.id_cursos;

    return this.cursosService
      .httpCreateCursosOnPessoa$(formData)
      .pipe(shareReplay())
      .subscribe({
        next: (data) => {
          this._dialogRef.close(data);
          Swal.fire({
            icon: 'success',
            text: 'Curso cadastrado com sucesso',
            showConfirmButton: false,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: 'Erro ao cadastrar curso',
            confirmButtonText: 'OK',
            confirmButtonColor: '#359830',
          });
        },
      });
  }

  public update() {
    const formData = this.form.value;
    formData.id_cursos = formData.id_cursos?.id_cursos;
    return this.cursosService
      .httpUpdateCursosOnPessoa$(formData, this.data.curso.id_cursos)
      .pipe(shareReplay())
      .subscribe({
        next: (data) => {
          this._dialogRef.close(data);
          Swal.fire({
            icon: 'success',
            title: 'Curso atualizado com sucesso',
            text: 'Atualize a página para ver as mudanças',
            showConfirmButton: false,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: 'Erro ao atualizar curso',
            confirmButtonText: 'OK',
            confirmButtonColor: '#359830',
          });
        },
      });
  }

  onInstituicaoSelecionada(instituicao: IInstituicao): void {
    if (instituicao && instituicao.id_instituicoes) {
      this.cursosService
        .httpGetCursosPorInstituicao$(instituicao.id_instituicoes)
        .subscribe({
          next: (cursos) => {
            this.optionsCursos = cursos;
            this.updateFilteredOptionsCursos();
          },
          error: (error) => console.error('Erro ao buscar cursos', error),
        });
    } else {
      this.optionsCursos = [];
      this.updateFilteredOptionsCursos();
    }
  }

  private updateFilteredOptionsCursos(): void {
    this.filteredOptionsCursos = this.form.get('id_cursos')!.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.curso;
        return name
          ? this._filterCursos(name as string)
          : this.optionsCursos.slice();
      })
    );
  }

  // Modifique o getInstituicoes para incluir o ouvinte de seleção
  public getInstituicoes() {
    this.instituicaoService.httpListInstituicao$().subscribe({
      next: (data) => {
        this.options = data;
        this.filteredOptions = this.form.get('instituicao')!.valueChanges.pipe(
          startWith(''),
          map((value) => {
            const name = typeof value === 'string' ? value : value?.nome;
            return name ? this._filter(name as string) : this.options.slice();
          })
        );

        // Adicione este ouvinte para detectar seleção de instituição
        this.form.get('instituicao')?.valueChanges.subscribe((value) => {
          if (value && typeof value === 'object') {
            this.onInstituicaoSelecionada(value);
          } else {
            this.optionsCursos = [];
            this.updateFilteredOptionsCursos();
          }
        });
      },
      error: (error) => console.error('Erro ao buscar instituições', error),
    });
  }
}
