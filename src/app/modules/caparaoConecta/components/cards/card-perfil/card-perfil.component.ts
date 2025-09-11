import { Component, Input } from '@angular/core';
import { IPessoa } from '../../../interface/IPessoa.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-perfil',
  imports: [CommonModule, RouterLink],
  templateUrl: './card-perfil.component.html',
  styleUrl: './card-perfil.component.scss',
})
export class CardPerfilComponent {
  @Input() pessoas: IPessoa[] | null = [];
}
