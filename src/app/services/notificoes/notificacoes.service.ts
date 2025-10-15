import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { INotificacoes } from '../../modules/caparaoConecta/interface/INotificacoes.interface';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacoesService {
  #http = inject(HttpClient);
  #url = environment.apiAuth;

  #setListNotificacoes = signal<INotificacoes[] | null>(null);
  public getListNotificacoes = this.#setListNotificacoes.asReadonly();
  public httpListNotificacoes$(): Observable<INotificacoes[]> {
    return this.#http.get<INotificacoes[]>(`${this.#url}/notificacoes`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListNotificacoes.set(data);
      })
    );
  }

  public httpMarcarComoLida$(idNotificacao: number): Observable<INotificacoes> {
    return this.#http.put<INotificacoes>(
      `${this.#url}/notificacoes/${idNotificacao}/marcar-como-lida`,
      {}
    );
  }
}
