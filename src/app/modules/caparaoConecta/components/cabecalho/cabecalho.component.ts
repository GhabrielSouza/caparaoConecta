/* * ARQUIVO: cabecalho.component.ts (CORRIGIDO)
 */

import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { SelectRegisterDialogComponent } from '../dialogs/select-register-dialog/select-register-dialog.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { MatDialog } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { SelecionarVagaComponent } from '../dialogs/selecionar-vaga/selecionar-vaga.component';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { environment } from '../../../../../environments/environment';
import { NotificacoesComponent } from '../notificacoes/notificacoes.component';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatBadgeModule,
    MatIconModule,
    NotificacoesComponent,
  ],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss',
})
export class CabecalhoComponent {
  private dialog = inject(MatDialog);
  private userAuth = inject(AuthService);
  private router = inject(Router);

  public url = signal(environment.apiAuth);

  public user = this.userAuth.currentUser;

  public roleEnum = ERoleUser;

  public navbarFixed = false;
  public isMenuOpen = false;

  openDialog(): void {
    this.dialog.open(SelectRegisterDialogComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: 'Como você deseja se cadastrar?',
    });
  }

  openDialogSelecionarVaga(): void {
    this.dialog.open(SelecionarVagaComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: {
        id: this.user()?.id_pessoas,
        role: this.user()?.tipo_usuario.nome,
        user: this.user(),
      },
    });
  }

  logout(): void {
    this.userAuth.logout().subscribe({
      next: () => {
        this.toggleMenu();
        this.router.navigate(['/home']);
      },
      error: (err) => console.error('Falha ao fazer logout', err),
    });
  }

  @HostListener('window:scroll', ['$event']) onscroll() {
    this.navbarFixed = window.scrollY > 30;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }
}
