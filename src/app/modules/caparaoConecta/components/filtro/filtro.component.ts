import { Component, Input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Imports necessários para os componentes do Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

// Suas interfaces e enums
import { IPessoa } from '../../interface/IPessoa.interface';
import { IAreasAtuacao } from '../../interface/IAreasAtuacao.interface';
import { ERoleUser } from '../../enum/ERoleUser.enum';

@Component({
  selector: 'app-filtro',
  standalone: true, // Garante que o componente é standalone
  imports: [
    CommonModule, // Necessário para @if, @for
    ReactiveFormsModule, // Necessário para [formGroup], formGroupName, formControlName
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule, // Necessário para os botões de limpar
  ],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroComponent {
  @Input() filtroForm!: FormGroup;
  @Input() areasAtuacao = signal<IAreasAtuacao[]>([]);
  @Input() empresas = signal<IPessoa[]>([]);
  @Input() role!: ERoleUser;

  public roleEnum = ERoleUser;

  public limparSelecaoEmpresa(event: MouseEvent): void {
    event.stopPropagation();
    this.filtroForm.get('id_empresa')?.setValue('');
  }

  public limparSelecaoAtuacao(event: MouseEvent): void {
    event.stopPropagation();
    this.filtroForm.get('atuacao')?.setValue('');
  }
}
