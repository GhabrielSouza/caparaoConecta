import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ERoleUser } from '../../enum/ERoleUser.enum';

@Component({
  selector: 'app-cabecalho',
  imports: [RouterLink, CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss',
})
export class CabecalhoComponent {
  public valorMenu: boolean = false;
  public role: ERoleUser | null = null;
  public roleEnum = ERoleUser;

  public openMenu() {
    this.valorMenu = !this.valorMenu;
  }
}
