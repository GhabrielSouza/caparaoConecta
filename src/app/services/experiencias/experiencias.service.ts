import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';
import { IExperiencia } from '../../modules/caparaoConecta/interface/IExperiencias.interface';

@Injectable({
  providedIn: 'root'
})
export class ExperienciasService {
  #http = inject(HttpClient);
  #url = environment.apiAuth;

  #setListExperiencia= signal<IExperiencia[] | null>(null);
  public getListEmpresa = this.#setListExperiencia.asReadonly();
  public httpListExperiencia$(id: number): Observable<IExperiencia[]> {
    return this.#http.get<IExperiencia[]>(`${this.#url}/api/experiencias`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListExperiencia.set(data);
      })
    );
  }

  #setListExperienciaId = signal<IExperiencia[] | null>(null);
  public getListEmpresaId = this.#setListExperienciaId.asReadonly();
  public httpListExperienciaId$(id: number): Observable<IExperiencia[]> {
    return this.#http.get<IExperiencia[]>(`${this.#url}/api/experiencias/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListExperienciaId.set(data);
      })
    );
  }

  #setCreateExperiencia = signal<IExperiencia | null>(null);
  public getCreateEmpresa = this.#setCreateExperiencia.asReadonly();
  public httpRegisterExperiencia$(empresa: IExperiencia): Observable<IExperiencia> {
    return this.#http
      .post<IExperiencia>(`${this.#url}/api/experiencias`, empresa)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setCreateExperiencia.set(data);
        })
      );
  }

  #setUpdateExperiencia = signal<IExperiencia | null>(null);
  public getUpdateEmpresa = this.#setUpdateExperiencia.asReadonly();
  public httpUpdateExperiencia$(id:string,empresa: IExperiencia): Observable<IExperiencia> {
    return this.#http
      .put<IExperiencia>(`${this.#url}/api/experiencias/${id}`, empresa)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setUpdateExperiencia.set(data);
        })
      );
  }

  
}
