import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IFormLogin } from '../../modules/caparaoConecta/interface/IFormLogin.interface';
import { IEmpresa } from '../../modules/caparaoConecta/interface/IEmpresa.inteface';
import { ICandidato } from '../../modules/caparaoConecta/interface/ICandidato.interface';
import { IPessoa } from '../../modules/caparaoConecta/interface/IPessoa.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  #http = inject(HttpClient);
  #url = environment.apiAuth;

  #setListUsuarios = signal<IPessoa[] | null>(null);
  public getListUsuarios = this.#setListUsuarios.asReadonly();
  public httpListPessoas$(): Observable<IPessoa[]> {
    return this.#http.get<IPessoa[]>(`${this.#url}/api/pessoas`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListUsuarios.set(data);
      })
    );
  }

  #setListEmpresa = signal<IPessoa[] | null>(null);
  public getListEmpresa = this.#setListEmpresa.asReadonly();
  public httpListEmpresas$(): Observable<IPessoa[]> {
    return this.#http.get<IPessoa[]>(`${this.#url}/api/pessoas`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListEmpresa.set(data);
      })
    );
  }

  #setListEmpresaId = signal<IEmpresa[] | null>(null);
  public getListEmpresaId = this.#setListEmpresaId.asReadonly();
  public httpListEmpresasId$(id: number): Observable<IEmpresa[]> {
    return this.#http.get<IEmpresa[]>(`${this.#url}/api/pessoas/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListEmpresaId.set(data);
      })
    );
  }

  #setCreateEmpresa = signal<IEmpresa | null>(null);
  public getCreateEmpresa = this.#setCreateEmpresa.asReadonly();
  public httpRegisterEmpresa$(empresa: IEmpresa): Observable<IEmpresa> {
    return this.#http
      .post<IEmpresa>(`${this.#url}/api/cadPessoas`, empresa)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setCreateEmpresa.set(data);
        })
      );
  }

  #setUpdateEmpresa = signal<IEmpresa | null>(null);
  public getUpdateEmpresa = this.#setCreateEmpresa.asReadonly();
  public httpUpdateEmpresa$(empresa: IEmpresa): Observable<IEmpresa> {
    return this.#http
      .put<IEmpresa>(`${this.#url}/api/cadPessoas/${empresa.id}`, empresa)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setUpdateEmpresa.set(data);
        })
      );
  }

  #setListCandidatoId = signal<IPessoa | null>(null);
  public getListCandidatoId = this.#setListCandidatoId.asReadonly();
  public httpListCandidatosId$(id: number): Observable<IPessoa> {
    return this.#http.get<IPessoa>(`${this.#url}/api/pessoas/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListCandidatoId.set(data);
      })
    );
  }

  public httpVisualizarPerfilCandidato$(id: number): Observable<IPessoa> {
    return this.#http
      .get<IPessoa>(`${this.#url}/api/pessoas/${id}/visualizacao`)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setListCandidatoId.set(data);
        })
      );
  }

  #setListCandidatoIdPerfil = signal<IPessoa | null>(null);
  public getListCandidatoIdPerfil = this.#setListCandidatoIdPerfil.asReadonly();
  public httpListCandidatosIdPerfil$(id: number): Observable<IPessoa> {
    return this.#http.get<IPessoa>(`${this.#url}/api/pessoas/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListCandidatoIdPerfil.set(data);
      })
    );
  }

  #setCreateCandidato = signal<ICandidato | null>(null);
  public getCreateCandidato = this.#setCreateCandidato.asReadonly();
  public httpRegisterCandidato$(candidato: ICandidato): Observable<ICandidato> {
    return this.#http
      .post<ICandidato>(`${this.#url}/api/cadPessoas`, candidato)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setCreateCandidato.set(data);
        })
      );
  }

  #setUpdateCandidato = signal<IPessoa | null>(null);
  public getUpdateCandidato = this.#setCreateCandidato.asReadonly();
  public httpUpdateCandidato$(
    id: number,
    candidato: IPessoa
  ): Observable<IPessoa> {
    return this.#http
      .put<IPessoa>(`${this.#url}/api/pessoas/${id}`, candidato)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setUpdateCandidato.set(data);
        })
      );
  }

  #setUpdatePessoaSobre = signal<IPessoa | null>(null);
  public setUpdatePessoaSobre = this.#setUpdatePessoaSobre.asReadonly();
  public httpUpdatePessoaSobre$(
    id: number,
    novoSobre: string
  ): Observable<IPessoa> {
    return this.#http
      .patch<IPessoa>(`${this.#url}/api/pessoas/${id}/sobre`, {
        sobre: novoSobre,
      })
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setUpdatePessoaSobre.set(data);
        })
      );
  }

  #setUpdatePessoaIamgem = signal<IPessoa | null>(null);
  public setUpdatePessoaIamgem = this.#setUpdatePessoaIamgem.asReadonly();
  public httpUpdatePessoaImagem$(
    id: number,
    imagem: File
  ): Observable<IPessoa> {
    const formData = new FormData();
    formData.append('imagem', imagem, imagem.name);

    const url = `${this.#url}/api/pessoas/${id}/imagem`;
    return this.#http.post<IPessoa>(url, formData);
  }
}
