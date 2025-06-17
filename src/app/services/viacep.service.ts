import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { IEstadoIbge } from '../modules/caparaoConecta/interface/IEstadoIbge.interface';
import { IMunicipioIbge } from '../modules/caparaoConecta/interface/IMunicipioIbge.interface';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViacepService {
  ApiViaCep: string = environment.ibgeUrl;

  constructor(private http: HttpClient) {}

  getEstados() {
    return this.http.get<IEstadoIbge[]>(this.ApiViaCep).pipe(shareReplay());
  }

  getMunicipioPorEstado(idEstado: string) {
    return this.http
      .get<IMunicipioIbge[]>(this.ApiViaCep + idEstado + '/municipios')
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }
}
