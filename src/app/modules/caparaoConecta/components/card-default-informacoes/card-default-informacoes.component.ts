import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { FormExperienciaProfissionalComponent } from '../dialogs/form-experiencia-profissional/form-experiencia-profissional.component';
import { IExperiencia } from '../../interface/IExperiencias.interface';

@Component({
  selector: 'app-card-default-informacoes',
  imports: [CommonModule],
  templateUrl: './card-default-informacoes.component.html',
  styleUrl: './card-default-informacoes.component.scss'
})
export class CardDefaultInformacoesComponent {
  @Input() public imagem = '';
  @Input() public cargo = 'Cargo';
  @Input() public empresa = 'Empresa';
  @Input() public data!:IExperiencia;
}
