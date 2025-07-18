import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { HabilidadesSService } from '../../../../../services/habilidades/habilidades-s.service';
import { DialogHabilidadesAdminComponent } from '../dialog-habilidades-admin/dialog-habilidades-admin.component';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IInstituicao } from '../../../interface/IInstuicao.interface';
import { map, Observable, startWith } from 'rxjs';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { InstituicoesService } from '../../../../../services/instituicoes/instituicoes.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-cursos-admin',
  imports: [
    ButtonPrimaryComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormFieldModule,
    MatAutocomplete,
    MatOptionModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-cursos-admin.component.html',
  styleUrl: './dialog-cursos-admin.component.scss',
})
export class DialogCursosAdminComponent {
  public formCurso: FormGroup;
  public modo: 'add' | 'edit';
  public titulo: string;

  tiposDeCurso: string[] = ['Presencial', 'EAD', 'Híbrido'];

  options: IInstituicao[] = [];
  filteredOptions!: Observable<IInstituicao[]>;

  constructor(
    private _dialogRef: MatDialogRef<DialogHabilidadesAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private instituicaoService: InstituicoesService
  ) {
    this.getInstituicoes();

    this.formCurso = this._fb.group({
      curso: ['', Validators.required],
      link: ['', Validators.required],
      instituicao: ['', Validators.required],
      cargo_horaria: ['', [Validators.required, Validators.min(1)]],
      tipo_de_curso: ['', Validators.required],
    });

    if (this.data && this.data.item) {
      this.modo = 'edit';
      this.titulo = 'Editar Curso';
      this.formCurso.patchValue({
        curso: this.data.item.curso,
        link: this.data.item.link,
        instituicao: this.data.item.instituicao,
        cargo_horaria: this.data.item.cargo_horaria,
        tipo_de_curso: this.data.item.tipo_curso,
      });
    } else {
      this.modo = 'add';
      this.titulo = 'Adicionar Curso';
    }
  }

  submit() {
    // 1. Verificamos se o formulário é válido
    if (this.formCurso.invalid) {
      this.formCurso.markAllAsTouched(); // Marca campos como tocados para exibir erros
      return; // Para a execução se o formulário não for válido
    }

    // 2. Pegamos os dados do formulário
    const dadosDoFormulario = this.formCurso.value;

    // Se estivermos editando, é bom enviar o ID de volta
    if (this.modo === 'edit') {
      dadosDoFormulario.id = this.data.item.id;
    }

    // 3. Fechamos o diálogo, passando os dados como argumento
    this._dialogRef.close(dadosDoFormulario);
  }

  closeModal() {
    this._dialogRef.close();
  }

  displayFnInstituicao(instituicao: any): string {
    return instituicao?.nome || '';
  }

  private _filter(value: string): IInstituicao[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.nome.toLowerCase().includes(filterValue)
    );
  }

  public getInstituicoes() {
    this.instituicaoService.httpListInstituicao$().subscribe({
      next: (data) => {
        this.options = data;
        this.filteredOptions = this.formCurso
          .get('instituicao')!
          .valueChanges.pipe(
            startWith(''),
            map((value) => {
              const name = typeof value === 'string' ? value : value?.nome;
              return name ? this._filter(name as string) : this.options.slice();
            })
          );
      },
      error: (error) => console.error('Erro ao buscar instituições', error),
    });
  }
}
