import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { DialogPerfilInformacoesComponent } from '../dialogs/dialog-perfil-informacoes/dialog-perfil-informacoes.component';


@Component({
  selector: 'app-component-perfil-dados',
  imports: [],
  templateUrl: './component-perfil-dados.component.html',
  styleUrl: './component-perfil-dados.component.scss'
})
export class ComponentPerfilDadosComponent {

  #dialog = inject(MatDialog);
  
   
  
    openDialog(): void {
      this.#dialog.open(DialogPerfilInformacoesComponent, {
        panelClass: EDialogEnum.FORMACAO,
        data: 'Adicionar formação acadêmica',
      });
    }
}
