import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IHabilidades } from '../../modules/caparaoConecta/interface/IHabilidades.interface';
import { Observable, shareReplay, tap } from 'rxjs';
import { IHabilidadesOnPessoas } from '../../modules/caparaoConecta/interface/IHabilidadesOnPessoas.interface';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesSService {
  #http = inject(HttpClient);
  #url = environment.apiAuth;

  #setListHabilidades = signal<IHabilidades[] | null>(null);
  public getListHabilidades = this.#setListHabilidades.asReadonly();
  public httpListHabilidades$(): Observable<IHabilidades[]> {
    return this.#http.get<IHabilidades[]>(`${this.#url}/api/habilidades`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListHabilidades.set(data);
      })
    );
  }

  #setListHabilidadesId = signal<IHabilidades[] | null>(null);
  public getListHabilidadesId = this.#setListHabilidadesId.asReadonly();
  public httpListHabilidadesId$(): Observable<IHabilidades[]> {
    return this.#http.get<IHabilidades[]>(`${this.#url}/api/habilidades`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListHabilidadesId.set(data);
      })
    );
  }

  #setCreateHabilidades = signal<IHabilidades | null>(null);
  public getCreateHabilidades = this.#setCreateHabilidades.asReadonly();
  public httpCreateHabilidades$(habilidades:IHabilidades): Observable<IHabilidades> {
    return this.#http.post<IHabilidades>(`${this.#url}/api/habilidades`, habilidades).pipe(
      shareReplay(),
      tap((data) => {
        this.#setCreateHabilidades.set(data);
      })
    );
  }
 

  #setUpdateHabilidades = signal<IHabilidades | null>(null);
  public getUpdateHabilidades = this.#setUpdateHabilidades.asReadonly();
  public httpUpdateHabilidades$(id:string,habilidades:IHabilidades): Observable<IHabilidades> {
    return this.#http.put<IHabilidades>(`${this.#url}/api/habilidades/${id}`,habilidades).pipe(
      shareReplay(),
      tap((data) => {
        this.#setUpdateHabilidades.set(data);
      })
    );
  }

  #setDeleteHabilidades = signal<IHabilidades | null>(null);
  public getGeleteHabilidades = this.#setDeleteHabilidades.asReadonly();
  public httpDeleteHabilidades$(id:string): Observable<IHabilidades> {
    return this.#http.delete<IHabilidades>(`${this.#url}/api/habilidades/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setDeleteHabilidades.set(data);
      })
    );
  }

  #setListHabilidadesOnPessoas = signal<IHabilidades[] | null>(null);
  public getListHabilidadesOnPessoas = this.#setListHabilidadesOnPessoas.asReadonly();
  public httpListHabilidadesOnPessoas$(id:number): Observable<IHabilidades[]> {
    return this.#http.get<IHabilidades[]>(`${this.#url}/api/habOnCandidato/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListHabilidadesOnPessoas.set(data);
      })
    );
  }

  #setCreateHabilidadesOnPessoas = signal<IHabilidadesOnPessoas | null>(null);
  public getCreateHabilidadesOnPessoas = this.#setCreateHabilidadesOnPessoas.asReadonly();
  public httpCreateHabilidadesOnPessoas$(Habilidades:IHabilidadesOnPessoas): Observable<IHabilidadesOnPessoas> {
    return this.#http.post<IHabilidadesOnPessoas>(`${this.#url}/api/habOnCandidato`, Habilidades).pipe(
      shareReplay(),
      tap((data) => {
        this.#setCreateHabilidadesOnPessoas.set(data);
      })
    );
  }

  //essa é especial pois precisamos enviar dados para realizar o delete das habilidadesw
  #setDeleteHabilidadesOnPessoas = signal<IHabilidadesOnPessoas | null>(null);
  public getDeleteHabilidadesOnPessoas = this.#setDeleteHabilidadesOnPessoas.asReadonly();
  public httpDeleteHabilidadesOnPessoas$(payload: IHabilidadesOnPessoas): Observable<IHabilidadesOnPessoas> {
    return this.#http.request<IHabilidadesOnPessoas>(
      'delete',
      `${this.#url}/api/habOnCandidato`,
      { body: payload } 
    ).pipe(
      shareReplay(),
      tap((data) => {
        this.#setDeleteHabilidadesOnPessoas.set(data);
      })
    );
  }

}
