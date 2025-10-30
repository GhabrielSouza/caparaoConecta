import { inject, Injectable, signal } from '@angular/core';
import { IFormacoesAcademicas } from '../../modules/caparaoConecta/interface/IFormacoesAcademicas.interface';
import { Observable, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormacoesAcademicasService {
  #http = inject(HttpClient);
  #url = `${environment.apiAuth}/api`;

  #setListFormacoes = signal<IFormacoesAcademicas[] | null>(null);
  public getListFormacoes = this.#setListFormacoes.asReadonly();
  public httpListFormacoes$(id: number): Observable<IFormacoesAcademicas[]> {
    return this.#http
      .get<IFormacoesAcademicas[]>(`${this.#url}/formacoes_academicas`)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setListFormacoes.set(data);
        })
      );
  }

  #setListFormacoesId = signal<IFormacoesAcademicas[] | null>(null);
  public getListFormacoesId = this.#setListFormacoesId.asReadonly();
  public httpListFormacoesId$(id: number): Observable<IFormacoesAcademicas[]> {
    return this.#http
      .get<IFormacoesAcademicas[]>(`${this.#url}/formacoes_academicas/${id}`)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setListFormacoesId.set(data);
        })
      );
  }

  #setCreateFormacoes = signal<IFormacoesAcademicas | null>(null);
  public getCreateFormacoes = this.#setCreateFormacoes.asReadonly();
  public httpRegisterFormacoes$(
    empresa: IFormacoesAcademicas
  ): Observable<IFormacoesAcademicas> {
    return this.#http
      .post<IFormacoesAcademicas>(`${this.#url}/formacoes_academicas`, empresa)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setCreateFormacoes.set(data);
        })
      );
  }

  #setUpdateFormacoes = signal<IFormacoesAcademicas | null>(null);
  public getUpdateFormacoes = this.#setUpdateFormacoes.asReadonly();
  public httpUpdateFormacoes$(
    id: string,
    empresa: IFormacoesAcademicas
  ): Observable<IFormacoesAcademicas> {
    return this.#http
      .put<IFormacoesAcademicas>(
        `${this.#url}/formacoes_academicas/${id}`,
        empresa
      )
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setUpdateFormacoes.set(data);
        })
      );
  }

  #setDeleteExperiencia = signal<IFormacoesAcademicas | null>(null);
  public getDeleteFormacoes = this.#setDeleteExperiencia.asReadonly();
  public httpDeleteFormacoes$(
    id: string | undefined
  ): Observable<IFormacoesAcademicas> {
    return this.#http
      .delete<IFormacoesAcademicas>(`${this.#url}/formacoes_academicas/${id}`)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setDeleteExperiencia.set(data);
        })
      );
  }
}
