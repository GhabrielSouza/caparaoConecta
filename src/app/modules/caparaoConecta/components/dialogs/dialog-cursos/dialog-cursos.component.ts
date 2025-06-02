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

@Component({
  selector: 'app-dialog-cursos',
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
  templateUrl: './dialog-cursos.component.html',
  styleUrl: './dialog-cursos.component.scss'
})
export class DialogCursosComponent {
  public form: FormGroup;
  
    constructor(
      private _dialogRef: MatDialogRef<DialogCursosComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string,
      private router: Router,
      private _fb: FormBuilder,
      private instituicaoService: InstituicoesService,
      private cursosService: CursosSService,
    ) {
      this.form = this._fb.group({
        instituicao: ['', [Validators.required]],
        cargoHoraria: ['', [Validators.required]],
        curso: ['', [Validators.required]],
        diploma: [false],
        dateConclusao: [''],
      });
    }
    
  options: IInstituicao[] = [];
  filteredOptions!: Observable<IInstituicao[]>;

  optionsCursos: ICursos[] = [];
  filteredOptionsCursos!: Observable<ICursos[]>;
  
  ngOnInit() {
    this.getInstituicoes();
    this.getCursos();
  
    // if(this.data.formacao){
    //   this.loadFormData(this.data.formacao);
    // }
  }
  
  private loadFormData(curso: ICursosOnPessoas): void {
    console.log(curso)
    this.form.patchValue({
      id_pessoasFisicas: ['', [Validators.required]],
      id_cursos: ['', [Validators.required]],
      nomeCurso: ['', [Validators.required]],
      instituicao: [''],
      diploma: [false],
      dateConclusao: [''],
    });
  
    // if (!formacao.data_conclusao) {
    //   this.form.get('data_conclusao')?.disable();
    // }
  }
  
  displayFnInstituicao(instituicao: any): string {
    return instituicao?.nome || '';
  }
  
  displayFnCurso(curso: any): string {
    return curso?.nome_curso || '';
  }
  
  private _filter(value: string): IInstituicao[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  private _filterCursos(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.optionsCursos.filter(option => 
      option.curso.toLowerCase().includes(filterValue)
    );
  }
  
  
    public closeModal() {
      this._dialogRef.close();
    }
  
    public submit() {
        const formData = this.form.value;
        console.log(formData)
  
        
        return this.cursosService
          .httpCreateCursosOnPessoa$(formData)
          .pipe(shareReplay())
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
  
      // public update() {
      //   const formData = this.form.value;
      //     console.log(this.form.value);
      //     return this.cursosService.httpUpdateCursosOnPessoa$(
      //         this.data.formacao.id_formacoes_academicas,
      //         formData
      //       )
      //       .pipe(shareReplay())
      //       .subscribe({
      //         next: (data) => {
      //           console.log('Formacao atualizada' + data);
      //           this._dialogRef.close(data);
      //         },
      //         error: (error) => [console.log(error)],
      //       });
      //   }
  
      public getInstituicoes(){
        this.instituicaoService.httpListInstituicao$().subscribe({
          next: (data) => {
            console.log(data);
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
  
            // if (this.data.formacao) {
            //   this.loadFormData(this.data.formacao);
            // }
          },
          error: (error) => {
            console.error('Erro ao buscar instituições', error);
          }
        });
      }

      public getCursos(){
        this.cursosService.httpListCursos$().subscribe({
          next: (data) => {
            console.log(data);
            this.optionsCursos = data;
            this.filteredOptionsCursos = this.form.get('curso')!.valueChanges.pipe(
              startWith(''),
              map(value => {
                const name = typeof value === 'string' ? value : value?.nome_curso;
                return name ? this._filterCursos(name as string) : this.options.slice();
              }),
            );
  
            this.form.get('curso')?.valueChanges.subscribe(value => {
              if (value && typeof value === 'object') {
                this.form.get('curso')?.setValue(value.id_cursos);
              }
            });
  
            // if (this.data.formacao) {
            //   this.loadFormData(this.data.formacao);
            // }
          },
          error: (error) => {
            console.error('Erro ao buscar instituições', error);
          }
        });
      }
}
