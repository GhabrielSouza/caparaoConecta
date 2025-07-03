import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { DialogPerfilInformacoesComponent } from '../dialogs/dialog-perfil-informacoes/dialog-perfil-informacoes.component';
import { IPessoa } from '../../interface/IPessoa.interface';
import { DialogEditarFotoUsuarioComponent } from '../dialogs/dialog-editar-foto-usuario/dialog-editar-foto-usuario.component';

@Component({
  selector: 'app-component-perfil-dados',
  imports: [],
  templateUrl: './component-perfil-dados.component.html',
  styleUrl: './component-perfil-dados.component.scss',
})
export class ComponentPerfilDadosComponent {
  #dialog = inject(MatDialog);

  @Input() public data!: IPessoa;
  @Input() public IdUsuario: any;
  @Input() public idTipoUsuario: any;

  get telefoneWhatsApp(): string {
    return '55' + (this.data?.telefone?.replace(/\D/g, '') ?? '');
  }

  get email(): string {
    return this.data?.usuario?.email ?? '';
  }

  openDialog(data: IPessoa): void {
    const dialogRef = this.#dialog.open(DialogPerfilInformacoesComponent, {
      panelClass: EDialogEnum.FORMACAO,
      data: {
        conteudo: data,
        id: this.IdUsuario,
        idTipoUsuario: this.idTipoUsuario,
      },
    });

    dialogRef.afterClosed().subscribe((resposta:IPessoa)=>{
      if(resposta){
        this.data = resposta;
      }
    });
  }

  dialogEditImagem(){
    const dialogRef = this.#dialog.open(DialogEditarFotoUsuarioComponent, {
      panelClass: EDialogEnum.PROJETOS,
    })
  }
}
