import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';
import { IInstituicao } from '../../modules/caparaoConecta/interface/IInstuicao.interface';

@Injectable({
  providedIn: 'root',
})
export class InstituicoesService {
  #http = inject(HttpClient);
  #url = `${environment.apiAuth}/api`;

  #setListInstituicao = signal<IInstituicao[] | null>(null);
  public getListInstituicao = this.#setListInstituicao.asReadonly();
  public httpListInstituicao$(): Observable<IInstituicao[]> {
    return this.#http.get<IInstituicao[]>(`${this.#url}/instituicoes`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListInstituicao.set(data);
      })
    );
  }

  #setListInstituicaoId = signal<IInstituicao[] | null>(null);
  public getListInstituicaoId = this.#setListInstituicaoId.asReadonly();
  public httpListInstituicaoId$(id: number): Observable<IInstituicao[]> {
    return this.#http
      .get<IInstituicao[]>(`${this.#url}/instituicoes/${id}`)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setListInstituicaoId.set(data);
        })
      );
  }

  #setCreateInstituicao = signal<IInstituicao | null>(null);
  public getCreateInstituicao = this.#setCreateInstituicao.asReadonly();
  public httpRegisterInstituicao$(
    empresa: IInstituicao
  ): Observable<IInstituicao> {
    return this.#http
      .post<IInstituicao>(`${this.#url}/instituicoes`, empresa)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setCreateInstituicao.set(data);
        })
      );
  }

  #setUpdateInstituicao = signal<IInstituicao | null>(null);
  public getUpdateInstituicao = this.#setUpdateInstituicao.asReadonly();
  public httpUpdateInstituica$(
    id: string,
    empresa: IInstituicao
  ): Observable<IInstituicao> {
    return this.#http
      .put<IInstituicao>(`${this.#url}/instituicoes/${id}`, empresa)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setUpdateInstituicao.set(data);
        })
      );
  }

  #setDeleteInsituicao = signal<IInstituicao | null>(null);
  public getDeleteInstituica = this.#setDeleteInsituicao.asReadonly();
  public httpDeleteInstituicao$(
    id: string | undefined
  ): Observable<IInstituicao> {
    return this.#http
      .delete<IInstituicao>(`${this.#url}/instituicoes/${id}`)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setDeleteInsituicao.set(data);
        })
      );
  }
}
