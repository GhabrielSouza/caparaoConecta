import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IVaga } from '../modules/caparaoConecta/interface/IVaga.interface';
import { IPessoa } from '../modules/caparaoConecta/interface/IPessoa.interface';
import { IPessoaFisica } from '../modules/caparaoConecta/interface/IPessoaFisica.interface';

@Injectable({
  providedIn: 'root',
})
export class VagasService {
  #http = inject(HttpClient);
  #url = environment.apiAuth;

  #setListVaga = signal<IVaga[]>([]);
  public getListVaga = this.#setListVaga.asReadonly();
  public httpListVagas$(): Observable<IVaga[]> {
    return this.#http.get<IVaga[]>(`${this.#url}/api/vagasShowAll`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListVaga.set(data);
      })
    );
  }

  #setListCandidaturas = signal<IPessoaFisica[]>([]);
  public getListCandidaturas = this.#setListCandidaturas.asReadonly();
  public httpListCandidaturas$(id: number): Observable<IPessoaFisica[]> {
    return this.#http
      .get<IPessoaFisica[]>(`${this.#url}/api/vagas/${id}/candidatos`)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setListCandidaturas.set(data);
        })
      );
  }

  #setListVagaId = signal<IVaga | null>(null);
  public getListVagaId = this.#setListVagaId.asReadonly();
  public httpListVagasId$(id: number): Observable<IVaga> {
    return this.#http.get<IVaga>(`${this.#url}/api/vagas/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListVagaId.set(data);
      })
    );
  }

  public atualizarStatusVagas$(
    ids: number[],
    novoStatus: string
  ): Observable<any> {
    const payload = {
      ids: ids,
      status: novoStatus,
    };
    return this.#http.patch(`${this.#url}/api/vagas/reativar`, payload);
  }

  public httpAtualizarStatusCandidato$(
    vagaId: number,
    candidatoId: number,
    status: string
  ): Observable<any> {
    const payload = {
      status: status,
    };
    return this.#http
      .patch(
        `${this.#url}/api/vagas/${vagaId}/candidatos/${candidatoId}`,
        payload
      )
      .pipe(shareReplay());
  }

  #setCreateVaga = signal<IVaga | null>(null);
  public getCreateVaga = this.#setCreateVaga.asReadonly();
  public httpRegisterVaga$(empresa: IVaga): Observable<IVaga> {
    return this.#http.post<IVaga>(`${this.#url}/api/cadVagas`, empresa).pipe(
      shareReplay(),
      tap((data) => {
        this.#setCreateVaga.set(data);
      })
    );
  }

  #setUpdateVaga = signal<IVaga | null>(null);
  public getUpdateVaga = this.#setUpdateVaga.asReadonly();
  public httpUpdateVaga$(vaga: IVaga, id: number): Observable<IVaga> {
    return this.#http.put<IVaga>(`${this.#url}/api/vagas/${id}`, vaga).pipe(
      shareReplay(),
      tap((data) => {
        this.#setUpdateVaga.set(data);
      })
    );
  }

  #setDeleteVaga = signal<IVaga | null>(null);
  public getDeleteVaga = this.#setDeleteVaga.asReadonly();
  public httpDeleteVaga$(id: number): Observable<IVaga> {
    return this.#http.delete<IVaga>(`${this.#url}/api/vagas/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setDeleteVaga.set(data);
      })
    );
  }

  #setPatchVaga = signal<string | null>(null);
  public getFinalizarVaga = this.#setPatchVaga.asReadonly();
  public httpFinalizarVaga$(id: number, status: string): Observable<string> {
    return this.#http
      .patch<string>(`${this.#url}/api/vagas/${id}`, status)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setPatchVaga.set(data);
        })
      );
  }
}
