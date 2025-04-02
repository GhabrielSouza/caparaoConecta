import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { VagaDialogComponent } from '../dialogs/vaga-dialog/vaga-dialog.component';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { CommonModule } from '@angular/common';
import { CadastroVagaDialogComponent } from '../dialogs/cadastro-vaga-dialog/cadastro-vaga-dialog.component';

@Component({
  selector: 'app-card-vaga',
  imports: [CommonModule],
  templateUrl: './card-vaga.component.html',
  styleUrl: './card-vaga.component.scss'
})
export class CardVagaComponent {
  #dialog = inject(MatDialog)
  
  public role: ERoleUser | null = ERoleUser.ADMIN;
  public roleEnum = ERoleUser;

  public openModel():void{
    this.#dialog.open(CadastroVagaDialogComponent, {
      panelClass: EDialogEnum.VAGA
    })
  }

  public imagemSemFundo = {
    imagemSrc: 'assets/imgs/semFoto.jpg'
  }
}
