import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { DatePipe, CommonModule } from '@angular/common';
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

  public notificacoesUser = signal<INotificacoes[]>([]);

  public notificacoesNaoLidas = computed(() => {
    return this.notificacoesUser().filter((n) => !n.data_leitura);
  });

  public countNaoLidas = computed(() => {
    return this.notificacoesNaoLidas().length;
  });

  ngOnInit() {
    this.getNotificacoes();
  }

  public getNotificacoes() {
    this.notificacoesService.httpListNotificacoes$().subscribe({
      next: (data) => {
        this.notificacoesUser.set(data || []);
      },
      error: (error) => console.error('Erro ao carregar notificações:', error),
    });
  }

  toggleNotificacoes(): void {
    this.dropdownAberto.set(!this.dropdownAberto());
  }

  fecharDropdown(): void {
    this.dropdownAberto.set(false);
  }

  handleNotificacaoClick(notificacao: INotificacoes): void {
    console.log('Notificação clicada:', notificacao);
    if (notificacao.id) {
      this.notificacoesService.httpMarcarComoLida$(notificacao.id).subscribe({
        next: () => {
          this.getNotificacoes();
        },
        error: (error) =>
          console.error('Erro ao marcar notificação como lida:', error),
      });
    }
    this.fecharDropdown();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notificacoes-container') && this.dropdownAberto()) {
      this.fecharDropdown();
    }
  }
}
