import { Component, inject, Input } from '@angular/core';
import { ButtonPrimaryComponent } from '../buttons/button-primary/button-primary.component';
import { MatDialog } from '@angular/material/dialog';
import { FormExperienciaProfissionalComponent } from '../dialogs/form-experiencia-profissional/form-experiencia-profissional.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';

@Component({
  selector: 'app-component-default-perfil',
  imports: [ButtonPrimaryComponent],
  templateUrl: './component-default-perfil.component.html',
  styleUrl: './component-default-perfil.component.scss'
})
export class ComponentDefaultPerfilComponent {
  #dialog = inject(MatDialog);

  @Input() public title:string = '';

  openDialog():void{
      this.#dialog.open(FormExperienciaProfissionalComponent,{
        panelClass:EDialogEnum.PROJETOS,
        data: 'Adicionar experiência profissional'
      })
    }
}
