import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { IAreasAtuacao } from '../../modules/caparaoConecta/interface/IAreasAtuacao.interface';

@Injectable({
  providedIn: 'root',
})
export class AreasAtuacaoService {
  #http = inject(HttpClient);
  #url = `${environment.apiAuth}/api`;

  #setListAreas = signal<IAreasAtuacao[] | null>(null);
  public getListAreas = this.#setListAreas.asReadonly();
  public httpListAreas$(): Observable<IAreasAtuacao[]> {
    return this.#http.get<IAreasAtuacao[]>(`${this.#url}/areas`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListAreas.set(data);
      })
    );
  }

  #setListAreasId = signal<IAreasAtuacao[] | null>(null);
  public getListAreasId = this.#setListAreasId.asReadonly();
  public httpListAreasId$(id: number): Observable<IAreasAtuacao[]> {
    return this.#http.get<IAreasAtuacao[]>(`${this.#url}/areas/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListAreasId.set(data);
      })
    );
  }

  #setCreateAreas = signal<IAreasAtuacao | null>(null);
  public getCreateAreas = this.#setCreateAreas.asReadonly();
  public httpRegisterAreas$(area: IAreasAtuacao): Observable<IAreasAtuacao> {
    return this.#http.post<IAreasAtuacao>(`${this.#url}/areas`, area).pipe(
      shareReplay(),
      tap((data) => {
        this.#setCreateAreas.set(data);
      })
    );
  }

  #setUpdateAreas = signal<IAreasAtuacao | null>(null);
  public getUpdateAreas = this.#setUpdateAreas.asReadonly();
  public httpUpdateAreas$(
    id: string,
    area: IAreasAtuacao
  ): Observable<IAreasAtuacao> {
    return this.#http.put<IAreasAtuacao>(`${this.#url}/areas/${id}`, area).pipe(
      shareReplay(),
      tap((data) => {
        this.#setUpdateAreas.set(data);
      })
    );
  }

  #setDeleteAreas = signal<IAreasAtuacao | null>(null);
  public getDeleteAreas = this.#setDeleteAreas.asReadonly();
  public httpDeleteAreas$(id: string): Observable<IAreasAtuacao> {
    return this.#http.delete<IAreasAtuacao>(`${this.#url}/areas/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setDeleteAreas.set(data);
      })
    );
  }
}
