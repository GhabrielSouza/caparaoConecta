import { Component, computed, inject, Inject, OnInit, ChangeDetectionStrategy, LOCALE_ID, model } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { VagasService } from '../../../../../services/vagas.service';
import { NgxMaskDirective } from 'ngx-mask';
import { registerLocaleData, CommonModule } from '@angular/common'; 
import localePt from '@angular/common/locales/pt';
import { HabilidadesSService } from '../../../../../services/habilidades/habilidades-s.service';
import { CursosSService } from '../../../../../services/cursos/cursos-s.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IHabilidades } from '../../../interface/IHabilidades.interface';
import { ICursos } from '../../../interface/ICursos.inteface';

registerLocaleData(localePt);

@Component({
  selector: 'app-cadastro-vaga-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDialogContent,
    MatSelectModule,
    NgxMaskDirective,
  ],
  templateUrl: './cadastro-vaga-dialog.component.html',
  styleUrl: './cadastro-vaga-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class CadastroVagaDialogComponent implements OnInit {
  vagaForm: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly announcer = inject(LiveAnnouncer);


  habilidadeInputCtrl = new FormControl('');
  allHabilidades: IHabilidades[] = [];
  filteredHabilidades$: Observable<IHabilidades[]>;

  cursoInputCtrl = new FormControl('');
  allCursos: ICursos[] = [];
  filteredCursos$: Observable<ICursos[]>;

  constructor(
    private _dialogRef: MatDialogRef<CadastroVagaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private vagaService: VagasService,
    private habilidadesService: HabilidadesSService,
    private cursosService: CursosSService
  ) {
    const dataEncerramento = new Date();
    dataEncerramento.setDate(dataEncerramento.getDate() + 20);

    this.vagaForm = this._fb.group({
      titulo_vaga: ['', Validators.required],
      modalidade_da_vaga: ['', Validators.required],
      salario: ['', Validators.required],
      data_fechamento: [{ value: dataEncerramento, disabled: true }, Validators.required],
      habilidades: this._fb.array([]),
      cursos: this._fb.array([]),
      descricao: [''],
      qtd_vaga: ['', [Validators.required, Validators.min(1)]],
      id_empresas: 2, 
    });

    this.filteredHabilidades$ = this.habilidadeInputCtrl.valueChanges.pipe(
      startWith(null),
      map((nomeHabilidade: string | null) =>
        nomeHabilidade ? this._filterHabilidades(nomeHabilidade) : this.allHabilidades.slice()
      )
    );

    this.filteredCursos$ = this.cursoInputCtrl.valueChanges.pipe(
      startWith(null),
      map((nomeCurso: string | null) =>
        nomeCurso ? this._filterCursos(nomeCurso) : this.allCursos.slice()
      )
    );
  }

  ngOnInit(): void {
    this.getHabilidades();
    this.getCursos();
  }

  get habilidadesFormArray(): FormArray {
    return this.vagaForm.get('habilidades') as FormArray;
  }
  get cursosFormArray(): FormArray {
    return this.vagaForm.get('cursos') as FormArray;
  }

  private _filterHabilidades(value: string): IHabilidades[] {
    const filterValue = value;
    const idsSelecionados = new Set(this.habilidadesFormArray.value.map((h: IHabilidades) => h.id_habilidades));
    return this.allHabilidades.filter(habilidade =>
      !idsSelecionados.has(habilidade.id_habilidades) && habilidade.nome.includes(filterValue)
    );
  }

  selectedHabilidade(event: MatAutocompleteSelectedEvent): void {
    const habilidade = event.option.value as IHabilidades;
    this.habilidadesFormArray.push(this._fb.control(habilidade));
    this.habilidadeInputCtrl.setValue(''); 
  }

  removeHabilidade(habilidade: IHabilidades): void {
    const index = this.habilidadesFormArray.value.findIndex((h: IHabilidades) => h.id_habilidades === habilidade.id_habilidades);
    if (index >= 0) {
      this.habilidadesFormArray.removeAt(index);
    }
  }

  private _filterCursos(value: string): ICursos[] {
    const filterValue = value;
    const idsSelecionados = new Set(this.cursosFormArray.value.map((c: ICursos) => c.id_cursos));
    return this.allCursos.filter(curso =>
      !idsSelecionados.has(curso.id_cursos) && curso.curso.includes(filterValue)
    );
  }

  selectedCurso(event: MatAutocompleteSelectedEvent): void {
    const curso = event.option.value as ICursos;
    this.cursosFormArray.push(this._fb.control(curso));
    this.cursoInputCtrl.setValue(''); 
  }

  removeCurso(curso: ICursos): void {
    const index = this.cursosFormArray.value.findIndex((c: ICursos) => c.id_cursos === curso.id_cursos);
    if (index >= 0) {
      this.cursosFormArray.removeAt(index);
    }
  }

  public onSubmit() {
    this.markFormGroupTouched(this.vagaForm);

    if (this.vagaForm.valid) {
      const formValue = this.vagaForm.getRawValue();

      formValue.habilidades = this.habilidadesFormArray.value.map((h: IHabilidades) => h.id_habilidades);
      formValue.cursos = this.cursosFormArray.value.map((c: ICursos) => c.id_cursos);

      if (formValue.data_fechamento) {
        formValue.data_fechamento = new Date(formValue.data_fechamento).toISOString().split('T')[0];
      }
      
      console.log('Enviando para o backend:', formValue);

      this.vagaService.httpRegisterVaga$(formValue).subscribe({
        next: (response) => {
          console.log('Vaga cadastrada com sucesso:', response);
          this._dialogRef.close(response);
        },
        error: (error) => {
          console.error('Erro ao cadastrar vaga:', error);
        },
      });
    } else {
      console.log('Formulário inválido');
    }
  }

  public getHabilidades() {
    this.habilidadesService.httpListHabilidades$().subscribe({
      next: (data) => {
        this.allHabilidades = data;
        this.habilidadeInputCtrl.setValue(''); 
      },
      error: (error) => console.error('Erro ao buscar habilidades:', error)
    });
  }

  public getCursos() {
    this.cursosService.httpListCursos$().subscribe({
      next: (data) => {
        this.allCursos = data;
        this.cursoInputCtrl.setValue(''); 
      },
      error: (error) => console.error('Erro ao buscar cursos:', error)
    });
  }

  public closeModal(): void {
    this._dialogRef.close();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
