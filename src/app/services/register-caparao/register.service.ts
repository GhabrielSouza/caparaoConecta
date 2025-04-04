import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IFormLogin } from '../../modules/caparaoConecta/interface/IFormLogin.interface';
import { IEmpresa } from '../../modules/caparaoConecta/interface/IEmpresa.inteface';
import { ICandidato } from '../../modules/caparaoConecta/interface/ICandidato.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  #url = signal(environment.apiAuth);

  constructor(private http: HttpClient) { }

  public httpRegisterEmpresa$(empresa:IEmpresa):Observable<IEmpresa>{
    return this.http.post<IEmpresa>(`${this.#url}/cadPessoas`, empresa).pipe(shareReplay()); 
  }

  public httpRegisterCandidato$(candidato:ICandidato):Observable<ICandidato>{
    return this.http.post<ICandidato>(`${this.#url}/cadastrar`, candidato).pipe(shareReplay()); 
  }
}
