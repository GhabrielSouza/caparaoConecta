import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { DialogPerfilInformacoesComponent } from '../dialogs/dialog-perfil-informacoes/dialog-perfil-informacoes.component';
import { IPessoa } from '../../interface/IPessoa.interface';
import { DialogEditarFotoUsuarioComponent } from '../dialogs/dialog-editar-foto-usuario/dialog-editar-foto-usuario.component';
import { RegisterService } from '../../../../services/register-caparao/register.service';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component-perfil-dados',
  imports: [CommonModule],
  templateUrl: './component-perfil-dados.component.html',
  styleUrl: './component-perfil-dados.component.scss',
})
export class ComponentPerfilDadosComponent implements OnInit {
  #dialog = inject(MatDialog);
  #pessoaService = inject(RegisterService);
  public url = signal(environment.apiAuth);

  @Input() public data!: IPessoa | null;
  @Input() public IdUsuario: any;
  @Input() public idTipoUsuario: any;

  @Input() isEditable: boolean = false;

  get telefoneWhatsApp(): string {
    return '55' + (this.data?.telefone?.replace(/\D/g, '') ?? '');
  }

  get email(): string {
    return this.data?.usuario?.email ?? '';
  }

  ngOnInit(): void {}

  openDialog(data: IPessoa | null): void {
    const dialogRef = this.#dialog.open(DialogPerfilInformacoesComponent, {
      panelClass: EDialogEnum.FORMACAO,
      data: {
        conteudo: data,
        id: this.IdUsuario,
        idTipoUsuario: this.idTipoUsuario,
      },
    });

    dialogRef.afterClosed().subscribe((resposta: IPessoa) => {
      if (resposta) {
        this.data = resposta;
      }
    });
  }

  dialogEditImagem() {
    const dialogRef = this.#dialog.open(DialogEditarFotoUsuarioComponent, {
      panelClass: EDialogEnum.PROJETOS,
    });

    dialogRef.afterClosed().subscribe((imagem: File | null) => {
      if (imagem) {
        this.imagemPessoa(this.IdUsuario, imagem);
      }
    });
  }

  public imagemPessoa(idUsuario: number, imagem: File): void {
    this.#pessoaService.httpUpdatePessoaImagem$(idUsuario, imagem).subscribe({
      next: (resposta) => {
        this.data = resposta;
      },
      error: (error) => {
        console.error('Erro ao atualizar imagem:', error);
      },
    });
  }
}
