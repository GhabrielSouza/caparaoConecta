import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IVaga } from '../../modules/caparaoConecta/interface/IVaga.interface';
import { IPessoa } from '../../modules/caparaoConecta/interface/IPessoa.interface';
import { IPessoaFisica } from '../../modules/caparaoConecta/interface/IPessoaFisica.interface';

@Injectable({
  providedIn: 'root',
})
export class VagasService {
  #http = inject(HttpClient);
  #url = environment.apiAuth;

  #setListVaga = signal<IVaga[]>([]);
  public getListVaga = this.#setListVaga.asReadonly();
  public httpListVagas$(filtros?: any): Observable<IVaga[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.modalidade) {
        const modalidadesSelecionadas = Object.keys(filtros.modalidade).filter(
          (key) => filtros.modalidade[key]
        );
        if (modalidadesSelecionadas.length > 0) {
          params = params.set('modalidade', modalidadesSelecionadas.join(','));
        }
      }
      if (filtros.id_empresa) {
        params = params.set('id_empresa', filtros.id_empresa);
      }
      if (filtros.atuacao) {
        params = params.set('atuacao', filtros.atuacao);
      }
    }
    return this.#http
      .get<IVaga[]>(`${this.#url}/vagasShowAll`, { params })
      .pipe(
        shareReplay(),
        tap((data) => {
          this.#setListVaga.set(data);
        })
      );
  }

  #setListCandidaturas = signal<IVaga | null>(null);
  public getListCandidaturas = this.#setListCandidaturas.asReadonly();
  public httpListCandidaturas$(id: number): Observable<IVaga> {
    return this.#http.get<IVaga>(`${this.#url}/vagas/${id}/candidatos`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListCandidaturas.set(data);
      })
    );
  }

  #setListVagaId = signal<IVaga | null>(null);
  public getListVagaId = this.#setListVagaId.asReadonly();
  public httpListVagasId$(id: number): Observable<IVaga> {
    return this.#http.get<IVaga>(`${this.#url}/vagas/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListVagaId.set(data);
      })
    );
  }

  public atualizarStatusVagas$(
    ids: number[],
    novoStatus: string
  ): Observable<any> {
    const payload = {
      ids: ids,
      status: novoStatus,
    };
    return this.#http.patch(`${this.#url}/vagas/reativar`, payload);
  }

  public httpAtualizarStatusCandidato$(
    vagaId: number,
    candidatoId: number,
    status: string
  ): Observable<any> {
    const payload = {
      status: status,
    };
    return this.#http
      .patch(`${this.#url}/vagas/${vagaId}/candidatos/${candidatoId}`, payload)
      .pipe(shareReplay());
  }

  #setCreateVaga = signal<IVaga | null>(null);
  public getCreateVaga = this.#setCreateVaga.asReadonly();
  public httpRegisterVaga$(empresa: IVaga): Observable<IVaga> {
    return this.#http.post<IVaga>(`${this.#url}/cadVagas`, empresa).pipe(
      shareReplay(),
      tap((data) => {
        this.#setCreateVaga.set(data);
      })
    );
  }

  #setUpdateVaga = signal<IVaga | null>(null);
  public getUpdateVaga = this.#setUpdateVaga.asReadonly();
  public httpUpdateVaga$(vaga: IVaga, id: number): Observable<IVaga> {
    return this.#http.put<IVaga>(`${this.#url}/vagas/${id}`, vaga).pipe(
      shareReplay(),
      tap((data) => {
        this.#setUpdateVaga.set(data);
      })
    );
  }

  #setDeleteVaga = signal<IVaga | null>(null);
  public getDeleteVaga = this.#setDeleteVaga.asReadonly();
  public httpDeleteVaga$(id: number): Observable<IVaga> {
    return this.#http.delete<IVaga>(`${this.#url}/vagas/${id}`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setDeleteVaga.set(data);
      })
    );
  }

  #setPatchVaga = signal<string | null>(null);
  public getFinalizarVaga = this.#setPatchVaga.asReadonly();
  public httpFinalizarVaga$(id: number, status: string): Observable<string> {
    return this.#http.patch<string>(`${this.#url}/vagas/${id}`, status).pipe(
      shareReplay(),
      tap((data) => {
        this.#setPatchVaga.set(data);
      })
    );
  }

  public httpProrrogarVaga$(
    vagaId: number,
    novaData: Date
  ): Observable<string> {
    const dataFormatada = novaData.toISOString().split('T')[0];

    const payload = {
      data_fechamento: dataFormatada,
    };

    const url = `${this.#url}/vagas/${vagaId}/prorrogar`;

    return this.#http.patch<string>(url, payload);
  }

  public httpCandidatarVaga$(vagaId: number): Observable<number> {
    return this.#http.post<number>(
      `${this.#url}/vagas/${vagaId}/candidatar`,
      {}
    );
  }

  public httpRegistrarVisualizacaoVaga$(vagaId: number): Observable<number> {
    return this.#http.post<number>(
      `${this.#url}/vagas/${vagaId}/visualizar`,
      {}
    );
  }

  public httpToggleFavorito$(vagaId: number): Observable<number> {
    return this.#http.post<number>(
      `${this.#url}/vagas/${vagaId}/favoritar`,
      {}
    );
  }

  #setListVagaFavorita = signal<IVaga[] | []>([]);
  public getListVagaFavorita = this.#setListVagaFavorita.asReadonly();
  public httpListarFavoritar$(): Observable<IVaga[]> {
    return this.#http.get<IVaga[]>(`${this.#url}/favoritos`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListVagaFavorita.set(data);
      })
    );
  }

  #setListVagaMinhasCandidaturas = signal<IVaga[] | []>([]);
  public getListVagaMinhasCandidaturas =
    this.#setListVagaMinhasCandidaturas.asReadonly();
  public httpListarMinhasCandidaturas$(): Observable<IVaga[]> {
    return this.#http.get<IVaga[]>(`${this.#url}/candidaturas`).pipe(
      shareReplay(),
      tap((data) => {
        this.#setListVagaMinhasCandidaturas.set(data);
      })
    );
  }
}
