import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ICursos } from '../../modules/caparaoConecta/interface/ICursos.inteface';
import { Observable, shareReplay, tap } from 'rxjs';
import { ICursosOnPessoas } from '../../modules/caparaoConecta/interface/ICursosOnPessoas.inteface';

@Injectable({
  providedIn: 'root'
})
export class CursosSService {
#http = inject(HttpClient);
#url = environment.apiAuth;

  #setListCursos = signal<ICursos[] | null>(null);
  public getListCursos = this.#setListCursos.asReadonly();
  public httpListCursos$(): Observable<ICursos[]> {
    return this.#http.get<ICursos[]>(`${this.#url}/api/cursos`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListCursos.set(data);
      })
    );
  }

  #setListCursosId = signal<ICursos[] | null>(null);
  public getListCursosId = this.#setListCursosId.asReadonly();
  public httpListCursosId$(id:string): Observable<ICursos[]> {
    return this.#http.get<ICursos[]>(`${this.#url}/api/cursos?${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListCursosId.set(data);
      })
    );
  }

  #setCursosPorInstituicao = signal<ICursos[] | null>(null);
  public getCursosPorInstituicao = this.#setCursosPorInstituicao.asReadonly();
  public httpGetCursosPorInstituicao$(idInstituicao: string): Observable<ICursos[]> {
    return this.#http.get<ICursos[]>(`${this.#url}/api/cursos/por-instituicao/${idInstituicao}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setCursosPorInstituicao.set(data);
      })
    );
  }

  #setCreateCursos = signal<ICursos[] | null>(null);
  public getCreateCursos = this.#setCreateCursos.asReadonly();
  public httpCreateCursos$(curso:ICursos): Observable<ICursos[]> {
    return this.#http.post<ICursos[]>(`${this.#url}/api/cursos`, curso).pipe(
      shareReplay(),
      tap((data) => {
        this.#setCreateCursos.set(data);
      })
    );
  }

  #setUpdateCursos = signal<ICursos[] | null>(null);
  public getUpdateCursos = this.#setUpdateCursos.asReadonly();
  public httpUpdateCursos$(id:string, curso:ICursos): Observable<ICursos[]> {
    return this.#http.put<ICursos[]>(`${this.#url}/api/curso/${id}`, curso).pipe(
      shareReplay(),
      tap((data) => {
        this.#setUpdateCursos.set(data);
      })
    );
  }

  #setDeleteCursos = signal<ICursos[] | null>(null);
  public getDeleteCurso = this.#setDeleteCursos.asReadonly();
  public httpDeleteCursos$(id:string): Observable<ICursos[]> {
    return this.#http.delete<ICursos[]>(`${this.#url}/api/cursos/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setDeleteCursos.set(data);
      })
    );
  }

  #setListCursosOnPessoa = signal<ICursosOnPessoas[] | null>(null);
  public getListCursosOnPessoaId = this.#setListCursosOnPessoa.asReadonly();
  public httpListCursosOnPessoaId$(id:number): Observable<ICursosOnPessoas[]> {
    return this.#http.get<ICursosOnPessoas[]>(`${this.#url}/api/cursosOnPessoaFisica/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListCursosOnPessoa.set(data);
      })
    );
  }

  #setCreateCursosOnPessoa = signal<ICursosOnPessoas | null>(null);
  public getCreateCursosOnPessoa = this.#setCreateCursosOnPessoa.asReadonly();
  public httpCreateCursosOnPessoa$(curso:ICursosOnPessoas): Observable<ICursosOnPessoas> {
    return this.#http.post<ICursosOnPessoas>(`${this.#url}/api/cursosOnPessoaFisica`, curso).pipe(
      shareReplay(),
      tap((data) => {
        this.#setCreateCursosOnPessoa.set(data);
      })
    );
  }

  #setUpdateCursosOnPessoa = signal<ICursosOnPessoas | null>(null);
  public getUpdateCursosOnPessoa = this.#setUpdateCursosOnPessoa.asReadonly();
  public httpUpdateCursosOnPessoa$(curso:ICursosOnPessoas, id:string): Observable<ICursosOnPessoas> {
    return this.#http.put<ICursosOnPessoas>(`${this.#url}/api/cursosOnPessoaFisica/${id}`, curso).pipe(
      shareReplay(),
      tap((data) => {
        this.#setUpdateCursosOnPessoa.set(data);
      })
    );
  }

  #setDeleteCursosOnPessoa = signal<ICursos[] | null>(null);
  public getDeleteCursosOnPessoa = this.#setDeleteCursosOnPessoa.asReadonly();
  public httpDeleteCursosOnPessoa$(id:number, id_pessoa:number): Observable<ICursos[]> {
    return this.#http.delete<ICursos[]>(`${this.#url}/api/cursosOnPessoaFisica/${id}/${id_pessoa}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setDeleteCursosOnPessoa.set(data);
      })
    );
  }
}
