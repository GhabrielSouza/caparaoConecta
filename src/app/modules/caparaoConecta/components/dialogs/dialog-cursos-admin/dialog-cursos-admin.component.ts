import { AsyncPipe, CommonModule } from '@angular/common';
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
import { DialogHabilidadesAdminComponent } from '../dialog-habilidades-admin/dialog-habilidades-admin.component';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
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
    CommonModule,
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
    this.formCurso = this._fb.group({
      curso: ['', Validators.required],
      link: ['', Validators.required],
      id_instituicoes: ['', Validators.required],
      cargo_horaria: ['', [Validators.required, Validators.min(1)]],
      id_tipo_de_cursos: ['', Validators.required],
    });

    this.getInstituicoes(data?.instituicoes ?? []);

    if (this.data && this.data.item) {
      this.modo = 'edit';
      this.titulo = 'Editar Curso';
      this.formCurso.patchValue({
        curso: this.data.item.curso,
        link: this.data.item.link,
        id_instituicoes: this.data.item.instituicao,
        cargo_horaria: this.data.item.cargo_horaria,
        id_tipo_de_cursos: this.data.item.id_tipo_de_cursos,
      });
    } else {
      this.modo = 'add';
      this.titulo = 'Adicionar Curso';
    }
  }

  submit() {
    if (this.formCurso.invalid) {
      this.formCurso.markAllAsTouched();
      return;
    }

    const dadosDoFormulario = this.formCurso.value;
    dadosDoFormulario.id_instituicoes =
      dadosDoFormulario.id_instituicoes.id_instituicoes;

    if (this.modo === 'edit') {
      dadosDoFormulario.id_cursos = this.data.item.id_cursos;
    }

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

  public getInstituicoes(data: IInstituicao[] = []) {
    this.options = data;
    this.filteredOptions = this.formCurso
      .get('id_instituicoes')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.nome;
          return name ? this._filter(name as string) : this.options.slice();
        })
      );
  }
}
