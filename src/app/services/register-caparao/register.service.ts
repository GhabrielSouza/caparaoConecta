import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IFormLogin } from '../../modules/caparaoConecta/interface/IFormLogin.interface';
import { IEmpresa } from '../../modules/caparaoConecta/interface/IEmpresa.inteface';
import { ICandidato } from '../../modules/caparaoConecta/interface/ICandidato.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  #http = inject(HttpClient);
  #url = environment.apiAuth;

  #setListEmpresa = signal<IEmpresa[] | null>(null);
  public getListEmpresa = this.#setListEmpresa.asReadonly();
  public httpListEmpresas$(): Observable<IEmpresa[]> {
    return this.#http.get<IEmpresa[]>(`${this.#url}/api/empresas`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListEmpresa.set(data);
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

  #setListCandidato = signal<ICandidato[] | null>(null);
  public getListCandidato = this.#setListCandidato.asReadonly();
  public httpListCandidatos$(): Observable<ICandidato[]> {
    return this.#http.get<ICandidato[]>(`${this.#url}/api/empresas`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListCandidato.set(data);
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

  #setUpdateCandidato = signal<ICandidato | null>(null);
  public getUpdateCandidato = this.#setCreateCandidato.asReadonly();
  public httpUpdateCandidato$(candidato: ICandidato): Observable<ICandidato> {
    return this.#http
      .put<ICandidato>(`${this.#url}/api/cadastrar/${candidato.id}`, candidato)
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setUpdateCandidato.set(data);
        })
      );
  }
}



