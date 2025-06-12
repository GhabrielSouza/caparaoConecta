import {
  Component,
  computed,
  inject,
  Inject,
  Input,
  model,
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
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { VagasService } from '../../../../../services/vagas.service';
import { NgxMaskDirective } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@Component({
  selector: 'app-cadastro-vaga-dialog',
  standalone: true,
  imports: [
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

  // --- Lógica para HABILIDADES ---
  readonly currentHabilidade = model('');
  readonly allHabilidades: string[] = [
    'Angular', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java',
    'Spring Boot', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'HTML', 'CSS',
    'SCSS', 'Vue.js', 'UX Design', 'UI Design', 'Metodologias Ágeis', 'Scrum',
    'Kanban', 'Git', 'RESTful APIs',
  ];
  readonly filteredHabilidades = computed(() => {
    const currentInput = this.currentHabilidade().toLowerCase();
    const currentSkillsInForm = this.habilidadesFormArray.value.map((s: string) => s.toLowerCase());
    return this.allHabilidades.filter(
      (h) =>
        !currentSkillsInForm.includes(h.toLowerCase()) &&
        h.toLowerCase().includes(currentInput)
    );
  });

  // --- Lógica para CURSOS ---
  readonly currentCurso = model('');
  readonly allCursos: string[] = [
    'Certificação AWS Cloud Practitioner', 'Certificação Scrum Master (CSM)',
    'Certificação PMP', 'Google UX Design Certificate', 'Oracle Certified Professional, Java SE Programmer',
    'Microsoft Certified: Azure Fundamentals', 'Cisco CCNA',
  ];
  readonly filteredCursos = computed(() => {
    const currentInput = this.currentCurso().toLowerCase();
    const currentCursosInForm = this.cursosFormArray.value.map((c: string) => c.toLowerCase());
    return this.allCursos.filter(
      (c) =>
        !currentCursosInForm.includes(c.toLowerCase()) &&
        c.toLowerCase().includes(currentInput)
    );
  });

  constructor(
    private _dialogRef: MatDialogRef<CadastroVagaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _fb: FormBuilder,
    private vagaService: VagasService
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
  }

  ngOnInit(): void {}

  public closeModal(): void {
    this._dialogRef.close();
  }

  get habilidadesFormArray(): FormArray {
    return this.vagaForm.get('habilidades') as FormArray;
  }

  get cursosFormArray(): FormArray {
    return this.vagaForm.get('cursos') as FormArray;
  }

  addHabilidade(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.habilidadesFormArray.value.includes(value)) {
      this.habilidadesFormArray.push(this._fb.control(value));
    }
    event.chipInput!.clear();
    this.currentHabilidade.set('');
  }

  removeHabilidade(habilidade: string): void {
    const index = this.habilidadesFormArray.value.indexOf(habilidade);
    if (index >= 0) {
      this.habilidadesFormArray.removeAt(index);
      this.announcer.announce(`Removida habilidade ${habilidade}`);
    }
  }

  selectedHabilidade(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (!this.habilidadesFormArray.value.includes(value)) {
      this.habilidadesFormArray.push(this._fb.control(value));
    }
    this.currentHabilidade.set('');
    event.option.deselect();
  }

  addCurso(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.cursosFormArray.value.includes(value)) {
      this.cursosFormArray.push(this._fb.control(value));
    }
    event.chipInput!.clear();
    this.currentCurso.set('');
  }

  removeCurso(curso: string): void {
    const index = this.cursosFormArray.value.indexOf(curso);
    if (index >= 0) {
      this.cursosFormArray.removeAt(index);
      this.announcer.announce(`Removido curso ${curso}`);
    }
  }

  selectedCurso(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (!this.cursosFormArray.value.includes(value)) {
      this.cursosFormArray.push(this._fb.control(value));
    }
    this.currentCurso.set('');
    event.option.deselect();
  }

  public onSubmit() {
    this.markFormGroupTouched(this.vagaForm);

    if (this.vagaForm.valid) {
      const formValue = this.vagaForm.getRawValue();

      if (formValue.data_fechamento) {
        formValue.data_fechamento = new Date(formValue.data_fechamento).toISOString().split('T')[0];
      }

      formValue.habilidades = formValue.habilidades.filter((h: string) => h && h.trim() !== '');
      formValue.cursos = formValue.cursos.filter((c: string) => c && c.trim() !== '');

      console.log('Formulário enviado (formato AAAA-MM-DD):', formValue);

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
      console.log('Formulário inválido:', this.vagaForm.getRawValue());
      console.log('Erros do formulário:', this.vagaForm.errors);
    }
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