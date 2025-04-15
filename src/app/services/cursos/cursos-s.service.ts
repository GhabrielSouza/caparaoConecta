import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ICursos } from '../../modules/caparaoConecta/interface/ICursos.inteface';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosSService {
#http = inject(HttpClient);
#url = environment.apiAuth;

  #setListEmpresa = signal<ICursos[] | null>(null);
  public getListEmpresa = this.#setListEmpresa.asReadonly();
  public httpListEmpresas$(): Observable<ICursos[]> {
    return this.#http.get<ICursos[]>(`${this.#url}/api/cursos`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListEmpresa.set(data);
      })
    );
  }
}
