import {
  Component,
  inject,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
  LOCALE_ID,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { VagasService } from '../../../../../services/vaga/vagas.service';
import { NgxMaskDirective } from 'ngx-mask';
import { registerLocaleData, CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HabilidadesSService } from '../../../../../services/habilidades/habilidades-s.service';
import { CursosSService } from '../../../../../services/cursos/cursos-s.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IHabilidades } from '../../../interface/IHabilidades.interface';
import { ICursos } from '../../../interface/ICursos.inteface';
import { IAreasAtuacao } from '../../../interface/IAreasAtuacao.interface';
import { AreasAtuacaoService } from '../../../../../services/areasAtuacao/areas-atuacao.service';

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
  isEditMode = false;

  readonly announcer = inject(LiveAnnouncer);

  habilidadeInputCtrl = new FormControl('');
  allHabilidades: IHabilidades[] = [];
  filteredHabilidades$: Observable<IHabilidades[]>;

  cursoInputCtrl = new FormControl('');
  allCursos: ICursos[] = [];
  filteredCursos$: Observable<ICursos[]>;
  areasAtuacao: IAreasAtuacao[] = [];

  constructor(
    private _dialogRef: MatDialogRef<CadastroVagaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private vagaService: VagasService,
    private habilidadesService: HabilidadesSService,
    private cursosService: CursosSService,
    private areasService: AreasAtuacaoService
  ) {
    const dataEncerramento = new Date();
    dataEncerramento.setDate(dataEncerramento.getDate() + 20);

    const dataBrasil = dataEncerramento.toLocaleDateString('pt-BR');

    this.vagaForm = this._fb.group({
      id_vagas: [null],
      titulo_vaga: ['', Validators.required],
      modalidade_da_vaga: ['', Validators.required],
      salario: ['', Validators.required],
      data_fechamento: [
        { value: dataBrasil.toString().split('T')[0], disabled: true },
        Validators.required,
      ],
      id_areas_atuacao: [''],
      habilidades: this._fb.array([]),
      cursos: this._fb.array([]),
      descricao: [''],
      qtd_vaga: ['', [Validators.required, Validators.min(1)]],
      status: ['EM_ANDAMENTO', Validators.required],
      id_empresas: this.data.id,
    });

    this.filteredHabilidades$ = this.habilidadeInputCtrl.valueChanges.pipe(
      startWith(null),
      map((nomeHabilidade: string | null) =>
        nomeHabilidade
          ? this._filterHabilidades(nomeHabilidade)
          : this.allHabilidades.slice()
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
    this.onListAreas();

    // Verifica se dados da vaga foram passados para entrar em modo de edição
    if (this.data && this.data.conteudoVaga) {
      this.isEditMode = true;
      this.loadFormData(this.data.conteudoVaga);
    }
  }

  private loadFormData(vaga: any): void {
    this.vagaForm.patchValue({
      id_vagas: vaga.id_vagas,
      titulo_vaga: vaga.titulo_vaga,
      modalidade_da_vaga: vaga.modalidade_da_vaga,
      salario: vaga.salario,
      data_fechamento: vaga.data_fechamento,
      descricao: vaga.descricao,
      qtd_vaga: vaga.qtd_vaga,
      status: vaga.status === 'INATIVO' ? 'EM_ANDAMENTO' : 'EM_ANDAMENTO',
    });

    // Limpa e preenche o FormArray de Habilidades
    this.habilidadesFormArray.clear();
    if (vaga.habilidades && Array.isArray(vaga.habilidades)) {
      vaga.habilidades.forEach((habilidade: IHabilidades) => {
        this.habilidadesFormArray.push(this._fb.control(habilidade));
      });
    }

    // Limpa e preenche o FormArray de Cursos
    this.cursosFormArray.clear();
    if (vaga.curso && Array.isArray(vaga.curso)) {
      vaga.curso.forEach((curso: ICursos) => {
        this.cursosFormArray.push(this._fb.control(curso));
      });
    }
  }

  get habilidadesFormArray(): FormArray {
    return this.vagaForm.get('habilidades') as FormArray;
  }

  get cursosFormArray(): FormArray {
    return this.vagaForm.get('cursos') as FormArray;
  }

  private _filterHabilidades(value: string): IHabilidades[] {
    const filterValue = value.toLowerCase();
    const idsSelecionados = new Set(
      this.habilidadesFormArray.value.map((h: IHabilidades) => h.id_habilidades)
    );
    return this.allHabilidades.filter(
      (habilidade) =>
        !idsSelecionados.has(habilidade.id_habilidades) &&
        habilidade.nome.toLowerCase().includes(filterValue)
    );
  }

  selectedHabilidade(event: MatAutocompleteSelectedEvent): void {
    const habilidade = event.option.value as IHabilidades;
    this.habilidadesFormArray.push(this._fb.control(habilidade));
    this.habilidadeInputCtrl.setValue('');
  }

  removeHabilidade(habilidade: IHabilidades): void {
    const index = this.habilidadesFormArray.value.findIndex(
      (h: IHabilidades) => h.id_habilidades === habilidade.id_habilidades
    );
    if (index >= 0) {
      this.habilidadesFormArray.removeAt(index);
    }
  }

  private _filterCursos(value: string): ICursos[] {
    const filterValue = value.toLowerCase();
    const idsSelecionados = new Set(
      this.cursosFormArray.value.map((c: ICursos) => c.id_cursos)
    );
    return this.allCursos.filter(
      (curso) =>
        !idsSelecionados.has(curso.id_cursos) &&
        curso.curso.toLowerCase().includes(filterValue)
    );
  }

  selectedCurso(event: MatAutocompleteSelectedEvent): void {
    const curso = event.option.value as ICursos;
    this.cursosFormArray.push(this._fb.control(curso));
    this.cursoInputCtrl.setValue('');
  }

  removeCurso(curso: ICursos): void {
    const index = this.cursosFormArray.value.findIndex(
      (c: ICursos) => c.id_cursos === curso.id_cursos
    );
    if (index >= 0) {
      this.cursosFormArray.removeAt(index);
    }
  }

  // Método unificado que será chamado pelo (ngSubmit) do formulário
  public save(): void {
    if (this.isEditMode) {
      this.onUpdate();
    } else {
      this.onSubmit();
    }
  }

  public onSubmit() {
    this.markFormGroupTouched(this.vagaForm);
    if (this.vagaForm.valid) {
      const formValue = this.vagaForm.getRawValue();

      formValue.habilidades = this.habilidadesFormArray.value.map(
        (h: IHabilidades) => h.id_habilidades
      );
      formValue.cursos = this.cursosFormArray.value.map(
        (c: ICursos) => c.id_cursos
      );

      console.log('Enviando para o backend (CRIAR):', formValue);

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

  public onUpdate() {
    this.markFormGroupTouched(this.vagaForm);
    if (this.vagaForm.valid) {
      const formValue = this.vagaForm.getRawValue();

      formValue.habilidades = this.habilidadesFormArray.value.map(
        (h: IHabilidades) => h.id_habilidades
      );
      formValue.cursos = this.cursosFormArray.value.map(
        (c: ICursos) => c.id_cursos
      );

      if (formValue.data_fechamento) {
        formValue.data_fechamento = new Date(formValue.data_fechamento)
          .toISOString()
          .split('T')[0];
      }

      console.log(this.data.idVagas);

      console.log('Enviando para o backend (ATUALIZAR):', formValue);

      this.vagaService.httpUpdateVaga$(formValue, this.data.idVaga).subscribe({
        next: (response) => {
          console.log('Vaga atualizada com sucesso:', response);
          this._dialogRef.close(response);
        },
        error: (error) => {
          console.error('Erro ao atualizar vaga:', error);
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
      error: (error) => console.error('Erro ao buscar habilidades:', error),
    });
  }

  public getCursos() {
    this.cursosService.httpListCursos$().subscribe({
      next: (data) => {
        this.allCursos = data;
        this.cursoInputCtrl.setValue('');
      },
      error: (error) => console.error('Erro ao buscar cursos:', error),
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
}
