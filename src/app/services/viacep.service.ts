import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { IViaCep } from '../modules/caparaoConecta/interface/IViaCep.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViacepService {
  ApiViaCep: string = environment.viaCepUrl;

  constructor(private http: HttpClient) {}

  getEnderecobyCep(cep: string) {
    return this.http.get<IViaCep>(this.ApiViaCep + cep + '/json').pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
