import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

import { IUsuario } from '../../modules/caparaoConecta/interface/IUsuario.interface';
import { IPessoa } from '../../modules/caparaoConecta/interface/IPessoa.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #url = signal(environment.apiAuth);

  public currentUser = signal<IUsuario | null | undefined>(undefined);

  constructor(private http: HttpClient) {}

  private getCsrfCookie(): Observable<any> {
    return this.http.get(`${this.#url()}/sanctum/csrf-cookie`);
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<IUsuario> {
    return this.getCsrfCookie().pipe(
      switchMap(() =>
        this.http.post<IUsuario>(`${this.#url()}/api/login`, credentials)
      ),
      tap((user) => this.currentUser.set(user))
    );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.#url()}/api/logout`, {})
      .pipe(tap(() => this.currentUser.set(null)));
  }

  checkAuthStatus(): Observable<IUsuario | null> {
    return this.http.get<IUsuario>(`${this.#url()}/api/user`).pipe(
      tap((user) => {
        this.currentUser.set(user);
        console.log(user);
      }),
      catchError(() => {
        this.currentUser.set(null);
        return of(null);
      })
    );
  }

  public getUserData(userId: number): Observable<IPessoa> {
    return this.http.get<IPessoa>(`${this.#url()}/api/pessoas/${userId}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.#url()}/api/forgot-password`, { email });
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.#url()}/api/reset-password`, data);
  }
}
