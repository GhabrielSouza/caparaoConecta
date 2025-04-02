import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { IFormLogin } from '../../modules/caparaoConecta/interface/IFormLogin.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  #url = signal(environment.apiAuth);

  constructor(private http: HttpClient) {}

  public httpLoginUser$(
    email: string,
    password: string
  ): Observable<IFormLogin> {
    return this.http
      .post<IFormLogin>(`${this.#url}/login`, { email, password })
      .pipe(shareReplay());
  }
}
