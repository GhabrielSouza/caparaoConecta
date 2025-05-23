import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-default-informacoes',
  imports: [CommonModule],
  templateUrl: './card-default-informacoes.component.html',
  styleUrl: './card-default-informacoes.component.scss',
})
export class CardDefaultInformacoesComponent {
  @Input() public imagem = '';
  @Input() public cargo = 'Cargo';
  @Input() public empresa = 'Empresa';
  @Input() public data = new Date();
}
