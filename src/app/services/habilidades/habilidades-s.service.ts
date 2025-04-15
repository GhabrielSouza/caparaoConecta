import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IHabilidades } from '../../modules/caparaoConecta/interface/IHabilidades.interface';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesSService {
  #http = inject(HttpClient);
  #url = environment.apiAuth;

  #setListEmpresa = signal<IHabilidades[] | null>(null);
  public getListEmpresa = this.#setListEmpresa.asReadonly();
  public httpListEmpresas$(): Observable<IHabilidades[]> {
    return this.#http.get<IHabilidades[]>(`${this.#url}/api/habilidades`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListEmpresa.set(data);
      })
    );
  }
}
