import {
  Component,
  effect,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NotificacoesService } from '../../../../services/notificoes/notificacoes.service';
import { INotificacoes } from '../../interface/INotificacoes.interface';

@Component({
  selector: 'app-notificacoes',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatBadgeModule, DatePipe],
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.scss',
})
export class NotificacoesComponent implements OnInit {
  dropdownAberto = signal(false);
  private notificacoesService = inject(NotificacoesService);

  public notificacoesUser: INotificacoes[] | null = [];

  ngOnInit() {
    this.getNotificacoes();
  }

  public getNotificacoes() {
    return this.notificacoesService.httpListNotificacoes$().subscribe({
      next: (res) => {
        this.notificacoesUser = res;
        console.log('Notificações recebidas:', res);
      },
      error: (err) => {
        console.error('Erro ao buscar notificações:', err);
      },
      complete: () => {
        console.log('Busca de notificações completa');
      },
    });
  }

  toggleNotificacoes(): void {
    this.dropdownAberto.set(!this.dropdownAberto());
  }

  fecharDropdown(): void {
    this.dropdownAberto.set(false);
  }

  countNotificacoes(): number {
    return this.notificacoesUser?.filter((n) => !n.lida).length || 0;
  }

  handleNotificacaoClick(notificacao: any): void {
    console.log('Notificação clicada:', notificacao);
    // Aqui você pode implementar a lógica para marcar como lida, navegar, etc.
    this.fecharDropdown();
  }

  // Fechar o dropdown ao clicar fora dele
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notificacoes-container') && this.dropdownAberto()) {
      this.fecharDropdown();
    }
  }
}
