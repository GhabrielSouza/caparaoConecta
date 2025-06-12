import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { IVagas } from '../../../interface/IVagas.interface';
import { IVaga } from '../../../interface/IVaga.interface';

@Component({
  selector: 'app-card-vaga-empresa',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './card-vaga-empresa.component.html',
  styleUrl: './card-vaga-empresa.component.scss',
})
export class CardVagaEmpresaComponent {
  @Input() public imagem: string = 'assets/imgs/semFoto.jpg';
  @Input() vagas: IVaga[] = [];

  currentPage: number = 0;
  pageSize: number = 3;

  get paginatedVagas(): IVaga[] {
    const start = this.currentPage * this.pageSize;
    return this.vagas.slice(start, start + this.pageSize);
  }

  onPageChange(event: PaginatorState) {
    this.currentPage = event.page ?? 0;
  }

  @Output() vagaClicada = new EventEmitter<IVaga>();

  onCardClick(vaga: IVaga) {
    this.vagaClicada.emit(vaga);
  }
}
