import { Component, HostListener, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificacoes',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatBadgeModule, DatePipe],
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.scss',
})
export class NotificacoesComponent {
  dropdownAberto = signal(false);

  // Exemplo de dados - substitua com seus dados reais
  notificacoes = [
    {
      id: 1,
      titulo: 'Nova mensagem',
      mensagem: 'Você recebeu uma nova mensagem de João Silva',
      data: new Date(),
      lida: false,
    },
    {
      id: 2,
      titulo: 'Atualização de vaga',
      mensagem: 'Sua candidatura foi visualizada pela empresa XYZ',
      data: new Date(Date.now() - 3600000),
      lida: true,
    },
    {
      id: 3,
      titulo: 'Lembrete',
      mensagem: 'Lembre-se de completar seu perfil para aumentar suas chances',
      data: new Date(Date.now() - 86400000),
      lida: false,
    },
  ];

  toggleNotificacoes(): void {
    this.dropdownAberto.set(!this.dropdownAberto());
  }

  fecharDropdown(): void {
    this.dropdownAberto.set(false);
  }

  countNotificacoes(): number {
    return this.notificacoes.filter((n) => !n.lida).length;
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
