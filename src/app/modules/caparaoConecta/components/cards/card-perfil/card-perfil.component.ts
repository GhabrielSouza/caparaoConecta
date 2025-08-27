import { Component, Input } from '@angular/core';
import { IPessoa } from '../../../interface/IPessoa.interface';

@Component({
  selector: 'app-card-perfil',
  imports: [],
  templateUrl: './card-perfil.component.html',
  styleUrl: './card-perfil.component.scss'
})
export class CardPerfilComponent {

  @Input() dados!: any; 
}
