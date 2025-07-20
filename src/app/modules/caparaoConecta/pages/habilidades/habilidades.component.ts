import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { TableComponent } from '../../components/table/table.component';
import { IHabilidades } from '../../interface/IHabilidades.interface';
import { HabilidadesSService } from '../../../../services/habilidades/habilidades-s.service';

import { DialogHabilidadesAdminComponent } from '../../components/dialogs/dialog-habilidades-admin/dialog-habilidades-admin.component';
import { ITableColumn } from '../../interface/ITableColumn.interface';

@Component({
  selector: 'app-habilidades',
  imports: [CabecalhoComponent, FooterComponent, TableComponent],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.scss',
})
export class HabilidadesComponent {
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

  getIdHabilidade = (item: IHabilidades) => item.id_habilidades;
  getNomeHabilidade = (item: IHabilidades) => item.nome;
  getStatusHabilidade = (item: IHabilidades) => item.status;

  constructor(private habilidadesService: HabilidadesSService) {
    this.onHabilidadesListadas();
  }

  onHabilidadeRecebida(habilidade: IHabilidades) {
    return this.habilidadesService
      .httpCreateHabilidades$(habilidade)
      .subscribe({
        next: (data) => {
          this.onHabilidadesListadas();
          console.log('Habilidade criada com sucesso:', data);
        },
        error: (error) => {
          console.error('Erro ao criar habilidade:', error);
        },
      });
  }

  onHabilidadeAtualizada(habilidade: IHabilidades) {
    return this.habilidadesService
      .httpUpdateHabilidades$(habilidade.id_habilidades, habilidade)
      .subscribe({
        next: (data) => {
          this.onHabilidadesListadas();
          console.log('Habilidade atualizada com sucesso:', data);
        },
        error: (error) => {
          console.error('Erro ao atualizar habilidade:', error);
        },
      });
  }

  onHabilidadeDeletada(id: number) {
    return this.habilidadesService.httpDeleteHabilidades$(id).subscribe({
      next: (data) => {
        console.log('Habilidade deletada com sucesso:', data);
        this.onHabilidadesListadas();
      },
      error: (error) => {
        console.error('Erro ao deletar habilidade:', error);
      },
    });
  }

  onHabilidadesListadas() {
    return this.habilidadesService.httpListHabilidades$().subscribe({
      next: (data) => {
        console.log('Lista de habilidades:', data);
        this.habilidadesData = data;
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
          console.log('Status da habilidade atualizado:', data);
          this.onHabilidadesListadas();
        },
        error: (error) => {
          console.error('Erro ao atualizar status da habilidade:', error);
        },
      });
  }
}
