import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IVagas } from '../modules/caparaoConecta/interface/IVagas.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VagasService {
  // VagasUrl: string = environment.VagasUrl;

  constructor(private http: HttpClient) {}

  getVagas() {
    return this.http.get<IVagas>('https://localhost:8000/vagas').pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
