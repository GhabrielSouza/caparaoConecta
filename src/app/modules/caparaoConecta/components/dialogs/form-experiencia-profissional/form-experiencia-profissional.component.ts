import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { CommonModule } from '@angular/common';
import { ExperienciasService } from '../../../../../services/experiencias/experiencias.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-experiencia-profissional',
  imports: [
    MatButtonModule,
    MatDialogContent,
    RouterModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    ButtonPrimaryComponent,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './form-experiencia-profissional.component.html',
  styleUrl: './form-experiencia-profissional.component.scss',
  standalone: true,
})
export class FormExperienciaProfissionalComponent implements OnInit {
  public formExperiencia: FormGroup;
  public isSubmitting = false;

  constructor(
    private _dialogRef: MatDialogRef<FormExperienciaProfissionalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private _fb: FormBuilder,
    private experienciaService: ExperienciasService
  ) {
    this.formExperiencia = this._fb.group({
      id_experiencias: [''],
      cargo: ['', [Validators.required]],
      nome_empresa: ['', [Validators.required]],
      data_emissao: ['', [Validators.required]],
      data_conclusao: ['', [Validators.required]],
      comprovacao: [false],
      comentario: [''],
      trabalho_atual: [false],
      id_pessoasFisicas:
        this.data.id || this.data.experiencia.id_pessoasFisicas,
    });
  }

  ngOnInit(): void {
    if (this.data.experiencia) {
      this.loadFormData(this.data.experiencia);
    }

    this.formExperiencia
      .get('trabalho_atual')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.formExperiencia.get('data_conclusao')?.disable();
          this.formExperiencia.get('data_conclusao')?.setValue(null);
          this.formExperiencia.get('data_conclusao')?.clearValidators();
          this.formExperiencia.get('data_conclusao')?.updateValueAndValidity();
        } else {
          this.formExperiencia.get('data_conclusao')?.enable();
        }
      });
  }

  public closeModal() {
    this._dialogRef.close();
  }

  private loadFormData(experiencia: any): void {
    this.formExperiencia.patchValue({
      id_experiencias: experiencia.id_experiencias,
      cargo: experiencia.cargo,
      nome_empresa: experiencia.nome_empresa,
      data_emissao: experiencia.data_emissao,
      data_conclusao: experiencia.data_conclusao,
      comprovacao: Boolean(experiencia.comprovacao),
      comentario: experiencia.comentario,
      trabalho_atual: !experiencia.data_conclusao,
    });

    if (!experiencia.data_conclusao) {
      this.formExperiencia.get('data_conclusao')?.disable();
    }
  }

  toggleDateTermino(event: MatCheckboxChange) {
    if (event.checked) {
      this.formExperiencia.get('data_conclusao')?.disable();
      this.formExperiencia.get('data_conclusao')?.setValue(null);
    } else {
      this.formExperiencia.get('data_conclusao')?.enable();
    }
  }

  public submit() {
    const formData = this.formExperiencia.value;

    if (formData.trabalho_atual) {
      formData.data_conclusao = '';
    }

    this._dialogRef.close(formData);
  }

  public update() {
    this._dialogRef.close(this.formExperiencia.value);
  }
}
