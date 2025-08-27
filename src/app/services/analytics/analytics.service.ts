import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {}

  registrarVisualizacaoVaga(vagaId: string) {
    console.log(`🔎 Serviço de Analytics recebido para a vaga: ${vagaId}`);
    const storageKey = 'vagas_visualizadas';
    let vagasVisualizadas: string[] = [];

    try {
      vagasVisualizadas = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
      console.error('Erro ao ler o localStorage:', e);
      vagasVisualizadas = []; // Garante que continue mesmo com localStorage corrompido
    }

    if (!vagasVisualizadas.includes(vagaId)) {
      console.log(`👍 A vaga ${vagaId} é nova. A registar visualização...`);

      // Verificação crucial: gtag existe?
      if (typeof gtag === 'function') {
        gtag('event', 'visualizacao_vaga', {
          vaga_id: vagaId,
        });
        console.log(
          `🚀 Evento 'visualizacao_vaga' enviado para o GA com o ID: ${vagaId}`
        );
      } else {
        console.error(
          '❌ ERRO: A função gtag() não foi encontrada no window. O script do Google Analytics pode não ter carregado.'
        );
      }

      vagasVisualizadas.push(vagaId);
      localStorage.setItem(storageKey, JSON.stringify(vagasVisualizadas));
    } else {
      console.log(
        `👀 A vaga ${vagaId} já foi visualizada nesta sessão. A ignorar.`
      );
    }
  }
}
