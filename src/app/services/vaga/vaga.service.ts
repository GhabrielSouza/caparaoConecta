import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';
import { IVagas } from '../../modules/caparaoConecta/interface/IVagas.interface';

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  #http = inject(HttpClient);
  #url = environment.apiAuth;

   #setListVaga = signal<IVagas[] | null>(null);
    public getListCandidato = this.#setListVaga.asReadonly();
    public httpListVaga$(): Observable<IVagas[]> {
      return this.#http.get<IVagas[]>(`${this.#url}/api/vagasShowAll`).pipe(
        shareReplay(),
        tap((data) => {
          this.#setListVaga.set(data);
        })
      );
    }
  
    #setCreateVaga = signal<IVagas | null>(null);
    public getCreateCandidato = this.#setCreateVaga.asReadonly();
    public httpRegisterVaga$(Vaga: IVagas): Observable<IVagas> {
      return this.#http
        .post<IVagas>(`${this.#url}/api/cadVagas`, Vaga)
        .pipe(
          shareReplay(),
          tap((data) => {
            this.#setCreateVaga.set(data);
          })
        );
    }
  
    #setUpdateVaga = signal<IVagas | null>(null);
    public getUpdateVagaId = this.#setUpdateVaga.asReadonly();
    public httpUpdateVagaId$(id:number,Vaga: IVagas): Observable<IVagas> {
      return this.#http
        .put<IVagas>(`${this.#url}/api/vagas/${id}`, Vaga)
        .pipe(
          shareReplay(),
          tap((data) => {
            this.#setUpdateVaga.set(data);
          })
        );
    }

    #setDeleteVaga = signal<IVagas | null>(null);
    public getDeleteVaga = this.#setDeleteVaga.asReadonly();
    public httpDeleteVaga$(id:number, Vaga: IVagas): Observable<IVagas> {
      return this.#http
        .put<IVagas>(`${this.#url}/api/vagas/${id}`, Vaga)
        .pipe(
          shareReplay(),
          tap((data) => {
            this.#setDeleteVaga.set(data);
          })
        );
    }
}
