import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { VagaDialogComponent } from '../dialogs/vaga-dialog/vaga-dialog.component';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-vaga',
  imports: [CommonModule],
  templateUrl: './card-vaga.component.html',
  styleUrl: './card-vaga.component.scss'
})
export class CardVagaComponent {
  #dialog = inject(MatDialog)
  
  public role: ERoleUser | null = ERoleUser.GUEST;
  public roleEnum = ERoleUser;

  public openModel():void{
    this.#dialog.open(VagaDialogComponent, {
      panelClass: EDialogEnum.VAGA
    })
  }

  public imagemSemFundo = {
    imagemSrc: 'assets/imgs/semFoto.jpg'
  }
}
