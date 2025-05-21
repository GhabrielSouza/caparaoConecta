import { Component, Input } from '@angular/core';
import { ComponentDefaultPerfilComponent } from '../../../components/component-default-perfil/component-default-perfil.component';

@Component({
  selector: 'app-perfil-empresa',
  imports: [ComponentDefaultPerfilComponent],
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss'],
})
export class PerfilEmpresaComponent {
  @Input() dadosEmpresa: any = {};
}
