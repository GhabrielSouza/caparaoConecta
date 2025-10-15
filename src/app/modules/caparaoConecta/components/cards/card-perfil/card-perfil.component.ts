import { Component, Input, signal } from '@angular/core';
import { IPessoa } from '../../../interface/IPessoa.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-card-perfil',
  imports: [CommonModule, RouterLink],
  templateUrl: './card-perfil.component.html',
  styleUrl: './card-perfil.component.scss',
})
export class CardPerfilComponent {
  @Input() pessoas: IPessoa[] | null = [];

  public url = signal(environment.apiAuth);
}
