import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { TableComponent } from '../../components/table/table.component';
import { IHabilidades } from '../../interface/IHabilidades.interface';
import { HabilidadesSService } from '../../../../services/habilidades/habilidades-s.service';

import { DialogHabilidadesAdminComponent } from '../../components/dialogs/dialog-habilidades-admin/dialog-habilidades-admin.component';
import { ITableColumn } from '../../interface/ITableColumn.interface';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { ButtonReturnTopComponent } from '../../components/buttons/button-return-top/button-return-top.component';

@Component({
  selector: 'app-habilidades',
  imports: [
    CabecalhoComponent,
    FooterComponent,
    TableComponent,
    ButtonReturnTopComponent,
  ],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.scss',
})
export class HabilidadesComponent implements OnInit {
  dialogHabilidades = DialogHabilidadesAdminComponent;

  habilidadesColumns: ITableColumn<IHabilidades>[] = [
    {
      key: 'nome',
      header: 'Habilidade',
    },
    {
      key: 'status',
      header: 'Status',
    },
  ];

  habilidadesData: IHabilidades[] = [];

  totalHabilidades = 0;

  currentPage = 0;
  pageSize = 5;

  getIdHabilidade = (item: IHabilidades) => item.id_habilidades;
  getNomeHabilidade = (item: IHabilidades) => item.nome;
  getStatusHabilidade = (item: IHabilidades) => item.status;

  ngOnInit(): void {
    this.onHabilidadesListadas();
  }

  constructor(private habilidadesService: HabilidadesSService) {}

  onHabilidadeRecebida(habilidade: IHabilidades) {
    return this.habilidadesService
      .httpCreateHabilidades$(habilidade)
      .subscribe({
        next: (data) => {
          this.onHabilidadesListadas();

          Swal.fire({
            icon: 'success',
            title: 'Habilidade criada com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao criar habilidade',
            text: error?.error?.message || 'Ocorreu um erro inesperado.',
          });
        },
      });
  }

  onHabilidadeAtualizada(habilidade: IHabilidades) {
    return this.habilidadesService
      .httpUpdateHabilidades$(habilidade.id_habilidades, habilidade)
      .subscribe({
        next: (data) => {
          this.onHabilidadesListadas();

          Swal.fire({
            icon: 'success',
            title: 'Habilidade atualizada com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao atualizar habilidade',
            text: error?.error?.message || 'Ocorreu um erro inesperado.',
          });
        },
      });
  }

  onHabilidadeDeletada(id: number) {
    return this.habilidadesService.httpDeleteHabilidades$(id).subscribe({
      next: (data) => {
        this.onHabilidadesListadas();
      },
      error: (error) => {
        console.error('Erro ao deletar habilidade:', error);
      },
    });
  }

  onHabilidadesListadas() {
    const pageIndexForApi = this.currentPage + 1;
    return this.habilidadesService
      .httpListHabilidadesPag$(pageIndexForApi, this.pageSize)
      .subscribe({
        next: (response) => {
          this.habilidadesData = response.data;
          this.totalHabilidades = response.total;
        },
        error: (error) => {
          console.error('Erro ao listar habilidades:', error);
        },
      });
  }

  onHabilidadeStatusToggled(habilidade: IHabilidades) {
    return this.habilidadesService
      .httpStatusHabilidades$(habilidade.id_habilidades)
      .subscribe({
        next: (data) => {
          this.onHabilidadesListadas();
          Swal.fire({
            icon: 'success',
            title: 'Status da habilidade atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao atualizar status da habilidade',
            text: error?.error?.message || 'Ocorreu um erro inesperado.',
          });
        },
      });
  }

  updatePaginatedData(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.onHabilidadesListadas();
  }
}
