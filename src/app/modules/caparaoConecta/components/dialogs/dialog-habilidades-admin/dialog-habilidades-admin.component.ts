import { Component, Inject } from '@angular/core';
import { HabilidadesSService } from '../../../../../services/habilidades/habilidades-s.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-habilidades-admin',
  imports: [
    ButtonPrimaryComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormFieldModule,
  ],
  templateUrl: './dialog-habilidades-admin.component.html',
  styleUrl: './dialog-habilidades-admin.component.scss',
})
export class DialogHabilidadesAdminComponent {
  public formHabilidade: FormGroup;
  public modo: 'add' | 'edit';
  public titulo: string;

  constructor(
    private _dialogRef: MatDialogRef<DialogHabilidadesAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private habilidadesService: HabilidadesSService,
    private _fb: FormBuilder
  ) {
    this.formHabilidade = this._fb.group({
      nome: ['', Validators.required],
    });

    if (this.data && this.data.item) {
      this.modo = 'edit';
      this.titulo = 'Editar habilidade';
      this.formHabilidade.patchValue({ nome: this.data.item.nome });
    } else {
      this.modo = 'add';
      this.titulo = 'Adicionar habilidade';
    }
  }

  submit(): void {
    // 1. Verificamos se o formulário é válido
    if (this.formHabilidade.invalid) {
      this.formHabilidade.markAllAsTouched(); // Marca campos como tocados para exibir erros
      return; // Para a execução se o formulário não for válido
    }

    // 2. Pegamos os dados do formulário
    const dadosDoFormulario = this.formHabilidade.value;

    // Se estivermos editando, é bom enviar o ID de volta
    if (this.modo === 'edit') {
      dadosDoFormulario.id_habilidades = this.data.item.id_habilidades;
    }

    // 3. Fechamos o diálogo, passando os dados como argumento
    this._dialogRef.close(dadosDoFormulario);
  }

  closeModal() {
    this._dialogRef.close();
  }

  public oldValue() {
    this.formHabilidade.patchValue({
      nome: this.data.item.nome,
    });
  }
}
