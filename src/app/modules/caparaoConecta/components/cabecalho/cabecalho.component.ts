import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { SelectRegisterDialogComponent } from '../dialogs/select-register-dialog/select-register-dialog.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cabecalho',
  imports: [RouterLink, CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss',
})
export class CabecalhoComponent {
  public valorMenu: boolean = false;
  public navbarFixed: boolean = false;
  public role: ERoleUser | null = ERoleUser.GUEST;
  public roleEnum = ERoleUser;
  
  #dialog = inject(MatDialog);

  public openMenu() {
    this.valorMenu = !this.valorMenu;
  }

  openDialog():void{
      this.#dialog.open(SelectRegisterDialogComponent,{
        panelClass:EDialogEnum.PROJETOS,
        data: 'Como você deseja se cadastrar?'
      })
  }

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 50) {
      this.navbarFixed = true;
    } else {
      this.navbarFixed = false;
    }
  }
}
