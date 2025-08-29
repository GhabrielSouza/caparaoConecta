import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { INotificacoes } from '../../interface/INotificacoes.interface ';

@Component({
  selector: 'app-notificacoes',
  imports: [MatIcon, CommonModule],
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.scss',
})
export class NotificacoesComponent {
  private notificacoes = signal<INotificacoes[]>([
    { id: 1, mensagem: 'Nova mensagem recebida', lida: false },
    { id: 2, mensagem: 'Seu perfil foi atualizado', lida: true },
    { id: 3, mensagem: 'Nova conexão solicitada', lida: false },
  ]);

  public notificacoesNaoLidas = signal(0);

  public ngOnInit() {
    this.atualizarNotificacoesNaoLidas();
  }

  public countNotificacoes = computed(() => this.notificacoes().length);

  public countNotificacoesNaoLidas = computed(() =>
    this.notificacoesNaoLidas()
  );

  private atualizarNotificacoesNaoLidas() {
    const naoLidas = this.notificacoes().filter((n) => !n.lida).length;
    this.notificacoesNaoLidas.set(naoLidas);
  }

  public getNotificacoes() {
    return this.notificacoes;
  }
}
