import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  imports: [RouterLink, CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss',
})
export class CabecalhoComponent {
  public valorMenu: boolean = false;

  public openMenu() {
    this.valorMenu = !this.valorMenu;
  }
}
