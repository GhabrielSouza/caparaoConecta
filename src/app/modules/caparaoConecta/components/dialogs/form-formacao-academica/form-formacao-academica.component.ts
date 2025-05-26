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
import { concatMap, map, Observable, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { IFormacoesAcademicas } from '../../../interface/IFormacoesAcademicas.interface';
import { IInstituicao } from '../../../interface/IInstuicao.interface';

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
    private formacaoService: FormacoesAcademicasService
  ) {
    this.form = this._fb.group({
      instituicao: ['', [Validators.required]],
      escolaridade: ['', [Validators.required]],
      areaEstudo: ['', [Validators.required]],
      conclusao: [false, [Validators.required]],
      diploma: [false],
      dateEmissao: ['', [Validators.required]],
      dateConclusao: [''],
    });
  }

  myControl = new FormControl<string | IInstituicao>('');
options: IInstituicao[] = [
  { id_instituicao: '1', nome: 'Instituto Federal do Espírito Santo', id_cidades: '1' },
  { id_instituicao: '2', nome: 'Universidade Federal de Viçosa', id_cidades: '2' },
  { id_instituicao: '3', nome: 'Universidade Federal de Lavras', id_cidades: '3' },
  { id_instituicao: '4', nome: 'Universidade Federal de São João del-Rei', id_cidades: '4' }
];
filteredOptions!: Observable<IInstituicao[]>;

ngOnInit() {
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => {
      const name = typeof value === 'string' ? value : value?.nome;
      return name ? this._filter(name as string) : this.options.slice();
    }),
  );
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
}
