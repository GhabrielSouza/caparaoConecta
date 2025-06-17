import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { SelectRegisterDialogComponent } from '../dialogs/select-register-dialog/select-register-dialog.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { MatDialog } from '@angular/material/dialog';
import { CadastroVagaDialogComponent } from '../dialogs/cadastro-vaga-dialog/cadastro-vaga-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { SelecionarVagaComponent } from '../dialogs/selecionar-vaga/selecionar-vaga.component';

@Component({
  selector: 'app-cabecalho',
  imports: [RouterLink, CommonModule, MatBadgeModule, MatIconModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss',
})
export class CabecalhoComponent {
  public valorMenu: boolean = false;
  public navbarFixed: boolean = false;
  public role: ERoleUser | null = ERoleUser.ADMIN;
  public roleEnum = ERoleUser;

  public idUsuario = 2;

  #dialog = inject(MatDialog);

  public openMenu() {
    this.valorMenu = !this.valorMenu;
  }

  openDialog(): void {
    this.#dialog.open(SelectRegisterDialogComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: 'Como você deseja se cadastrar?',
    });
  }

  openDialogSelecionarVaga(): void {
    this.#dialog.open(SelecionarVagaComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: {
        id: this.idUsuario,
      },
    });
  }

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 50) {
      this.navbarFixed = true;
    } else {
      this.navbarFixed = false;
    }
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // Bloquear scroll do body quando menu está aberto
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  // Fechar menu ao clicar em um link
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.menu-content') &&
      !target.closest('.menu-toggle') &&
      this.isMenuOpen
    ) {
      this.toggleMenu();
    }
  }
}
