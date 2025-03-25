import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICandidato } from '../../modules/caparaoConecta/interface/ICandidato.interface';
import { IEmpresa } from '../../modules/caparaoConecta/interface/IEmpresa.inteface';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

    #url = signal(environment.apiLogin);
  
    constructor(private http: HttpClient) { }
  
    public httpRegisterEmpresa$():Observable<Array<IEmpresa>>{
      return this.http.get<Array<IEmpresa>>(`${this.#url}/empresa`).pipe(shareReplay()); 
    }
  
    public httpRegisterCandidato$():Observable<Array<ICandidato>>{
      return this.http.get<Array<ICandidato>>(`${this.#url}/candidato`).pipe(shareReplay()); 
    }
}
