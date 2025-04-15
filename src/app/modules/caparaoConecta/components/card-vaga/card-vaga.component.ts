import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { VagaDialogComponent } from '../dialogs/vaga-dialog/vaga-dialog.component';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { CommonModule } from '@angular/common';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-card-vaga',
  imports: [CommonModule, Carousel, ButtonModule, Tag],
  standalone: true,
  templateUrl: './card-vaga.component.html',
  styleUrl: './card-vaga.component.scss'
})
export class CardVagaComponent {
  #dialog = inject(MatDialog)

  @Input() public imagem:string = 'assets/imgs/semFoto.jpg';
  @Input() public titulo:string = 'Titulo da vaga';
  @Input() public empresa:string = 'Empresa';
  @Input() public qtd_vagas:number = 0;

  vagas:any = '';
  
  public role: ERoleUser | null = ERoleUser.GUEST;
  public roleEnum = ERoleUser;

  public openModel():void{
    this.#dialog.open(VagaDialogComponent, {
      panelClass: EDialogEnum.VAGA,
      
    })
  }
}
